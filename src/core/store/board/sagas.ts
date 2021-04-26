import { call, put, takeLatest } from "@redux-saga/core/effects";
import { select } from "redux-saga/effects";
import { IBoard, INewBoard } from "../../../@types/board";
import { IStore } from "../../../@types/store";
import { TrelloService } from "../../api/trello.service";
import { ACTIONS } from "../actions";

const trelloService = new TrelloService();


function *getBoards() {
    trelloService.getToken();
    const boards:IBoard[] = yield call(trelloService.getBoards.bind(trelloService));
    if(boards) {
        yield put({type:ACTIONS.BOARD_ACTIONS.BOARDS, data:boards});
    }
}

function *createBoard() {
    const newBoard: INewBoard = yield select((store: IStore) => store.newBoard);
    const createdBoard: IBoard = yield call(trelloService.createBoard.bind(trelloService, newBoard));
    if(createdBoard) {
        const boards = yield select((store: IStore) => store.boards);
        yield put({type: ACTIONS.BOARD_ACTIONS.BOARDS, data: [...boards, createdBoard]});
    }
}

function *boardsSaga() {
    yield takeLatest(ACTIONS.BOARD_ACTIONS.GET_BOARDS, getBoards);
    yield takeLatest(ACTIONS.BOARD_ACTIONS.CREATE_BOARD, createBoard);
}

export default boardsSaga;