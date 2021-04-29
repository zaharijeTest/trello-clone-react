import { call, put, takeLatest } from "@redux-saga/core/effects";
import { select } from "redux-saga/effects";
import { IBoard, INewBoard } from "../../../@types/board";
import { IStore } from "../../../@types/store";
import { BoardModel } from "../../../models/board.model";
import { TrelloService } from "../../api/trello.service";
import { BOARD_ACTIONS, selectBoardAction, setBoardsAction } from "./actions";

const trelloService = new TrelloService();

function* getBoards() {
  const boards: BoardModel[] = yield call(
    trelloService.getBoards.bind(trelloService)
  );
  if (boards) {
    yield put(setBoardsAction(boards.map((b) => new BoardModel(b))));
  }
}

function* getBoard() {
  const selectedBoard: IBoard = yield select(
    (store: IStore) => store.boardsStore.selectedBoard
  );
  if (selectedBoard) {
    const board: BoardModel = yield call(
      trelloService.getBoard.bind(trelloService, selectedBoard.id)
    );
    yield put(selectBoardAction(board));
  }
}

function* createBoard() {
  const newBoard: INewBoard = yield select(
    (store: IStore) => store.boardsStore.newBoard
  );
  const createdBoard: IBoard = yield call(
    trelloService.createBoard.bind(trelloService, newBoard)
  );
  if (createdBoard) {
    const boards = yield select((store: IStore) => store.boardsStore.boards);
    yield put(setBoardsAction([...boards, createBoard]));
  }
}

function* boardsSaga() {
  yield takeLatest(BOARD_ACTIONS.GET_BOARDS, getBoards);
  yield takeLatest(BOARD_ACTIONS.GET_BOARD, getBoard);
  yield takeLatest(BOARD_ACTIONS.CREATE_BOARD, createBoard);
}

export default boardsSaga;
