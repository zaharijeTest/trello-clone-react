import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IBoard } from "../../@types/board";
import { IDispatch, IMapToProps, INullable, IStore } from "../../@types/store";
import { getBoards, selectBoard, createBoard } from '../../core/store/board/actions';
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
    getBoards: IDispatch;
    selectBoard: IDispatch;
    createBoard: IDispatch;
}

interface IBoardListProps extends IBoardsListStateProps, IBoardsListDispatchProps { }

const goToBoard = (history: any, board: IBoard) => {
    history.push({ pathname: `boards/${board.id}` });
}

const BoardsListPage = ({ getBoards, boards, user, selectBoard, createBoard }: IBoardListProps) => {
    const [modal, setModal] = useState(false);
    const history = useHistory();
    useEffect(() => {
        getBoards();
    }, [getBoards,user]);

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
                        selectBoard(board); 
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
                    <NewBoard user={user} boards={boards} onSubmit={(newBoard) => { createBoard(newBoard); setModal(false)}}></NewBoard>
                </Modal>
            }

        </div>
    )
};


const mapProps: IMapToProps<IBoardsListStateProps, IBoardsListDispatchProps> = [
    (store: IStore) => ({ boards: store.boards, user: store.user, selectedBoard: store.selectedBoard }),
    { getBoards, selectBoard, createBoard }
]



export default connect(...mapProps)(BoardsListPage);

