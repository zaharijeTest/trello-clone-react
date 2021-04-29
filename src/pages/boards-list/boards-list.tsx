import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IDispatch, IMapToProps, INullable, IStore } from "../../@types/store";
import {
  getBoardsAction,
  selectBoardAction,
  createBoardAction,
} from "../../core/store/board/actions";
import { useHistory } from "react-router-dom";
import { Modal } from "../../shared/components/modal/modal.component";
import { IUser } from "../../@types/user";
import NewBoard from "../board/components/new-board/new-board";
import { BoardModel } from "../../models/board.model";
import "./boards-list.css";
import { MenuList } from "../../shared/components/menu-list/menu-list";
import { Title } from "../../shared/components/title/title";
import {
  getRecentBoards,
  pushRecentBoard,
} from "../../core/services/cache.service";

interface IBoardsListStateProps {
  boards: BoardModel[];
  user: INullable<IUser>;
}

interface IBoardsListDispatchProps {
  getBoardsAction: IDispatch;
  selectBoardAction: IDispatch;
  createBoardAction: IDispatch;
}

interface IBoardListProps
  extends IBoardsListStateProps,
    IBoardsListDispatchProps {}

const goToBoard = (history: any, board: BoardModel) => {
  history.push({ pathname: `boards/${board.id}` });
};

const MENU_ITEMS = [
  { icon: "", text: "Boards" },
  { icon: "", text: "Templates" },
  { icon: "", text: "Home" },
];

const createBoardTile = (board: BoardModel, history) => (
  <div
    className="board-tile"
    style={{
      background: board.getBackground(),
    }}
    key={board.id}
    onClick={() => {
      selectBoardAction(board);
      pushRecentBoard(board);
      goToBoard(history, board);
    }}
  >
    {board.name}
  </div>
);

const BoardsListPage = ({
  getBoardsAction,
  boards,
  user,
  selectBoardAction,
  createBoardAction,
}: IBoardListProps) => {
  const [modal, setModal] = useState(false);
  const history = useHistory();
  useEffect(() => {
    getBoardsAction();
  }, [getBoardsAction, user]);
  const recentBoards = getRecentBoards();

  return (
    <div className="boards-list-wrapper">
      <MenuList items={MENU_ITEMS} />
      <div>
        <Title>
          <span>Recently Viewed</span>
        </Title>
        <div className="boards-list">
          {boards
            .filter((board) => recentBoards.includes(board.id))
            .map((board) => createBoardTile(board, history))}
        </div>
        <Title>
          <span>{user?.fullName}'s Workspace</span>
        </Title>
        <div className="boards-list">
          {boards.map((board) => createBoardTile(board, history))}
          <div
            className="black-text board-tile align-center "
            onClick={() => {
              setModal(true);
            }}
          >
            Create New Board
          </div>
          {modal && (
            <Modal onCloseClicked={() => setModal(false)}>
              <NewBoard
                user={user}
                boards={boards}
                onSubmit={(newBoard) => {
                  createBoardAction(newBoard);
                  setModal(false);
                }}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

const mapProps: IMapToProps<IBoardsListStateProps, IBoardsListDispatchProps> = [
  (store: IStore) => ({
    boards: store.boardsStore.boards,
    user: store.userStore.user,
    selectedBoard: store.boardsStore.selectedBoard,
  }),
  { getBoardsAction, selectBoardAction, createBoardAction },
];

export default connect(...mapProps)(BoardsListPage);
