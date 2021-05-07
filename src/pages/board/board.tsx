import { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { IDispatch, IMapToProps, INullable, IStore } from "../../@types/store";
import { getBoardAction } from "../../core/store/board/actions";
import { BoardModel } from "../../models/board.model";
import { Button } from "../../shared/components/button/button";
import { CardTile } from "./components/card-tile/card-tile";
import { Member } from "./components/member/member";
import { Modal } from "../../shared/components/modal/modal.component";
import { CardDetails } from "./components/card-details/card-details";
import { TrelloService } from "../../core/api/trello.service";
import "./board.css";
import { IBoardCard } from "../../@types/card";
import { Loader } from "../../shared/components/loader/loader";

interface IBoardStateProps {
  board: INullable<BoardModel>;
}

interface IBoardDispatchProps {
  getBoardAction: IDispatch;
}

interface IBoardProps extends IBoardStateProps, IBoardDispatchProps {}

const trelloService = new TrelloService();

const Board: FunctionComponent<IBoardProps> = ({ board, getBoardAction }) => {
  const { boardId } = useParams<{ boardId: string }>();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const [{ selectedCard, modal }, setState] = useState<{
    selectedCard?: IBoardCard | null;
    modal?: boolean;
  }>({ modal: false });

  useEffect(() => {
    getBoardAction(boardId);
  }, [getBoardAction, boardId]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectedCardId = searchParams.get("selectedCard");
    if (selectedCardId) {
      board?.lists?.forEach((list) =>
        list.cards.forEach((card) => {
          if (card.id === selectedCardId) {
            setState((state) => ({ ...state, selectedCard: card }));
          }
        })
      );
    } else {
      setState((state) => ({ ...state, modal: false, selectedCard: null }));
    }
  }, [board, location]);

  useEffect(() => {
    if (selectedCard && !modal) {
      setLoading(true);
      trelloService
        .getBoardCard(selectedCard.id)
        .then((r) => {
          Object.assign(selectedCard, r);
          setSelectedCardQueryParam(selectedCard.id);
          setState((state) => ({
            ...state,
            modal: true,
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [selectedCard, modal]);

  const handleModalClose = () => {
    history.push({});
    setState((state) => ({ ...state, modal: false, selectedCard: null }));
  };

  const setSelectedCardQueryParam = (selectedCardId: string) => {
    const params = new URLSearchParams();
    params.append("selectedCard", selectedCardId);
    history.push({ search: params.toString() });
  };

  return (
    <div style={{ background: board?.getBackground() }}>
      <div className="board-header">
        <Button transparent={true}>
          <span className="bold">{board?.name}</span>
        </Button>
        <Button transparent={true}>
          <span className="icon-star" />
        </Button>
        <div className="board-header-separator" />
        <Button transparent={true}>
          <span>Add to workspace</span>
        </Button>
        <div className="flex">
          {board?.members.map((member) => (
            <Member key={member.id} member={member} />
          ))}
        </div>
      </div>
      <Loader loading={loading}>
        <div className="lists-wrapper">
          {board?.lists &&
            board.lists.map((boardList) => (
              <div key={boardList.id} className="list-wrapper">
                <div className="list-name">{boardList.name}</div>
                <div className="list-content">
                  {boardList.cards.map((card) => (
                    <CardTile
                      key={card.id}
                      card={card}
                      onClicked={() =>
                        setState((state) => ({
                          ...state,
                          selectedCard: card,
                        }))
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </Loader>
      {modal && selectedCard && (
        <Modal
          onCloseClicked={() => {
            handleModalClose();
          }}
        >
          <CardDetails card={selectedCard} />
        </Modal>
      )}
    </div>
  );
};

const mapToProps: IMapToProps<IBoardStateProps, IBoardDispatchProps> = [
  (store: IStore) => ({ board: store.boardsStore.selectedBoard }),
  { getBoardAction },
];

export default connect(...mapToProps)(Board);
