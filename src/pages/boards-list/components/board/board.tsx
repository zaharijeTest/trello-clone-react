import { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { IDispatch, IMapToProps, INullable, IStore } from "../../../../@types/store";
import { COLORS } from "../../../../config/colors";
import { getBoardAction } from '../../../../core/store/board/actions';
import { BoardModel } from "../../../../models/board.model";
import { Button } from "../../../../shared/components/button/button";
import { CardTile } from "../card-tile/card-tile";
import './board.css';

interface IBoardStateProps {
    board: INullable<BoardModel>;
    location?: any;
}

interface IBoardDispatchProps {
    getBoardAction: IDispatch
}

interface IBoardProps extends IBoardStateProps, IBoardDispatchProps { };



const Board: FunctionComponent<IBoardProps> = ({ board, getBoardAction }) => {
    const { boardId } = useParams<{ boardId: string }>();

    useEffect(() => {
        getBoardAction(boardId);
    }, [getBoardAction])
    return (
        <div style={{ background: board?.getBackground() }}>
            <div className="board-header">
                <Button color={COLORS.GRAY}><span>{board?.name}</span></Button>
            </div>
            <div className="lists-wrapper">
                {board?.lists && board.lists.map(boardList => (
                    <div key={boardList.id} className="list-wrapper">
                        <div className="list-name">{boardList.name}</div>
                        <div className="list-content">
                            {boardList.cards.map(card => <CardTile key={card.id} card={card}></CardTile>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

const mapToProps: IMapToProps<IBoardStateProps, IBoardDispatchProps> = [
    (store: IStore) => ({ board: store.boardsStore.selectedBoard }),
    { getBoardAction }
]

export default connect(...mapToProps)(Board);