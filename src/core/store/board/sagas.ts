import { call, put, takeLatest } from "@redux-saga/core/effects";
import { TrelloService } from "../../api/trello.service";
import { ACTIONS } from "../actions";

const trelloService = new TrelloService();


function *getBoards() {
    const boards = yield call(trelloService.getBoards.bind(trelloService));
    yield put({type:ACTIONS.BOARD_ACTIONS.BOARDS, data:boards});
}

function *boardsSaga() {
    yield takeLatest(ACTIONS.BOARD_ACTIONS.GET_BOARDS, getBoards);
}

export default boardsSaga;