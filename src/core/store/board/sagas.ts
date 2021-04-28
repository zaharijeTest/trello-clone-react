import { call, put, takeLatest } from "@redux-saga/core/effects";
import { select } from "redux-saga/effects";
import { IBoard, INewBoard } from "../../../@types/board";
import { IBoardCard } from "../../../@types/card";
import { IStore } from "../../../@types/store";
import { BoardModel } from "../../../models/board.model";
import { CardModel } from "../../../models/card.model";
import { TrelloService } from "../../api/trello.service";
import { BOARD_ACTIONS, selectBoardAction, selectCardAction, setBoardsAction } from "./actions";

const trelloService = new TrelloService();


function* getBoards() {
    const boards: BoardModel[] = yield call(trelloService.getBoards.bind(trelloService));
    if (boards) {
        yield put(setBoardsAction(boards.map(b => new BoardModel(b))));
    }
}

function* getBoard() {
    const selectedBoard: IBoard = yield select((store: IStore) => store.boardsStore.selectedBoard);
    if (selectedBoard) {
        const board: BoardModel = yield call(trelloService.getBoard.bind(trelloService, selectedBoard.id));
        yield put(selectBoardAction(board));
    }
}

function* getBoardCard() {
    const selectedCard: IBoardCard = yield select((store: IStore) => store.boardsStore.selectedCard);
    if (selectedCard) {
        const card: CardModel = yield call(trelloService.getBoardCard.bind(trelloService, selectedCard.id));
        yield put(selectCardAction(card));
    }
}



function* createBoard() {
    const newBoard: INewBoard = yield select((store: IStore) => store.boardsStore.newBoard);
    const createdBoard: IBoard = yield call(trelloService.createBoard.bind(trelloService, newBoard));
    if (createdBoard) {
        const boards = yield select((store: IStore) => store.boardsStore.boards);
        yield put(setBoardsAction([...boards, createBoard]));
    }
}

function* boardsSaga() {
    yield takeLatest(BOARD_ACTIONS.GET_BOARDS, getBoards);
    yield takeLatest(BOARD_ACTIONS.GET_BOARD, getBoard);
    yield takeLatest(BOARD_ACTIONS.CREATE_BOARD, createBoard);
    yield takeLatest(BOARD_ACTIONS.GET_BOARD_CARD, getBoardCard);
}

export default boardsSaga;