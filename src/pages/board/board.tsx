import { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { IDispatch, IMapToProps, INullable, IStore } from "../../@types/store";
import { getBoardAction } from '../../core/store/board/actions';
import { BoardModel } from "../../models/board.model";
import { Button } from "../../shared/components/button/button";
import { CardTile } from "./components/card-tile/card-tile";
import { Member } from "./components/member/member";
import { Modal } from "../../shared/components/modal/modal.component";
import { CardDetails } from "./components/card-details/card-details";
import { TrelloService } from "../../core/api/trello.service";
import { CardModel } from "../../models/card.model";
import './board.css';

interface IBoardStateProps {
    board: INullable<BoardModel>;
}

interface IBoardDispatchProps {
    getBoardAction: IDispatch
}

interface IBoardProps extends IBoardStateProps, IBoardDispatchProps { };


const trelloService = new TrelloService();

const Board: FunctionComponent<IBoardProps> = ({ board, getBoardAction }) => {
    const { boardId } = useParams<{ boardId: string }>();
    const [modal, showModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState<CardModel>();

    useEffect(() => {
        getBoardAction(boardId);
    }, [getBoardAction, boardId]);

    return (
        <div style={{ background: board?.getBackground() }}>
            <div className="board-header">
                <Button transparent={true} ><span className="bold">{board?.name}</span></Button>
                <Button transparent={true}><span className="icon-star"></span></Button>
                <div className="board-header-separator"></div>
                <Button transparent={true}><span>Add to workspace</span></Button>
                <div className="flex">
                    {board?.members.map(member => <Member key={member.id} member={member}></Member>)}
                </div>
            </div>
            <div className="lists-wrapper">
                {board?.lists && board.lists.map(boardList => (
                    <div key={boardList.id} className="list-wrapper">
                        <div className="list-name">{boardList.name}</div>
                        <div className="list-content">
                            {boardList.cards.map(card =>
                                <CardTile
                                    key={card.id}
                                    card={card}
                                    onClicked={() => {
                                        trelloService.getBoardCard(card.id).then(r => {
                                            setSelectedCard(r);
                                            showModal(true);
                                        })
                                    }}>
                                </CardTile>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {modal &&
                <Modal onCloseClicked={() => showModal(false)}>
                    <CardDetails card={selectedCard}></CardDetails>
                </Modal>
            }
        </div>

    )
}

const mapToProps: IMapToProps<IBoardStateProps, IBoardDispatchProps> = [
    (store: IStore) => ({ board: store.boardsStore.selectedBoard }),
    { getBoardAction }
]

export default connect(...mapToProps)(Board);