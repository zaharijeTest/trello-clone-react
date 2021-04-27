import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IBoard } from "../../@types/board";
import { IDispatch, IMapToProps, INullable, IStore } from "../../@types/store";
import { getBoardsAction, selectBoardAction, createBoardAction } from '../../core/store/board/actions';
import { useHistory } from 'react-router-dom';
import { Modal } from "../../shared/components/modal/modal.component";
import './boards-list.css';
import { IUser } from "../../@types/user";
import NewBoard from './components/new-board/new-board';

interface IBoardsListStateProps {
    boards: IBoard[];
    user: INullable<IUser>;
}

interface IBoardsListDispatchProps {
    getBoardsAction: IDispatch;
    selectBoardAction: IDispatch;
    createBoardAction: IDispatch;
}

interface IBoardListProps extends IBoardsListStateProps, IBoardsListDispatchProps { }

const goToBoard = (history: any, board: IBoard) => {
    history.push({ pathname: `boards/${board.id}` });
}

const BoardsListPage = ({ getBoardsAction, boards, user, selectBoardAction, createBoardAction }: IBoardListProps) => {
    const [modal, setModal] = useState(false);
    const history = useHistory();
    useEffect(() => {
        getBoardsAction();
    }, [getBoardsAction,user]);

    return (
        <div className="boards-list">
            {boards.map(board => (
                <div
                    className="board-tile"
                    style={{
                        background: board.prefs.backgroundImage ? `url(${board.prefs.backgroundImage})` : board.prefs.backgroundColor,
                    }}
                    key={board.id}
                    onClick={() => {
                        selectBoardAction(board); 
                        goToBoard(history, board);
                    }}
                >
                    {board.name}
                </div>
            ))}
            <div className="board-tile" onClick={() => {
                setModal(true)
            }}>Create New Board</div>
            {modal &&
                <Modal header="New Board" onCloseClicked={() => setModal(false)}>
                    <NewBoard user={user} boards={boards} onSubmit={(newBoard) => { createBoardAction(newBoard); setModal(false)}}></NewBoard>
                </Modal>
            }

        </div>
    )
};


const mapProps: IMapToProps<IBoardsListStateProps, IBoardsListDispatchProps> = [
    (store: IStore) => ({ boards: store.boardsStore.boards, user: store.userStore.user, selectedBoard: store.boardsStore.selectedBoard }),
    { getBoardsAction, selectBoardAction, createBoardAction }
]



export default connect(...mapProps)(BoardsListPage);

