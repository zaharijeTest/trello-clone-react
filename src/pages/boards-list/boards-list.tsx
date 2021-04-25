import { useEffect } from "react";
import { connect } from "react-redux";
import { IBoard } from "../../@types/board";
import { IDispatch, IMapToProps, IStore } from "../../@types/store";
import { getBoards } from '../../core/store/board/actions';
import { useHistory } from 'react-router-dom';

interface IBoardsListStateProps {
    boards: IBoard[];
}

interface IBoardsListDispatchProps {
    getBoards: IDispatch;
}

interface IBoardListProps extends IBoardsListStateProps, IBoardsListDispatchProps { }

const goToBoard = (history: any, board: IBoard) => {
    history.push({ pathname: `boards/${board.id}` });
}

const BoardsListPage = ({ getBoards, boards }: IBoardListProps) => {
    const history = useHistory();
    useEffect(() => {
        getBoards();
    }, [getBoards]);

    return (
        <div className="boards-list">
            {boards.map(board => (
                <div
                    className="board-tile"
                    style={{
                        background: board.prefs.backgroundImage ? `url(${board.prefs.backgroundImage})`: board.prefs.backgroundColor,
                    }}
                    key={board.id}
                    onClick={() => goToBoard(history, board)}
                >
                    {board.name}
                </div>
            ))}
            <div className="board-tile">Create New Board</div>
        </div>
    )
};


const mapProps: IMapToProps<IBoardsListStateProps, IBoardsListDispatchProps> = [
    (store: IStore) => ({ boards: store.boards }),
    { getBoards }
]



export default connect(...mapProps)(BoardsListPage);

