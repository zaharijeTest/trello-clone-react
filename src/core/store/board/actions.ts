import { INewBoard } from "../../../@types/board"
import { IBoardCard } from "../../../@types/card";
import { BoardModel } from "../../../models/board.model";
import { CardModel } from "../../../models/card.model";

export const BOARD_ACTIONS = {
    GET_BOARDS: 'GET_BOARDS',
    BOARDS: 'BOARDS',
    SELECT_BOARD: 'SELECT_BOARD',
    CREATE_BOARD: 'CREATE_BOARD',
    GET_BOARD: 'GET_BOARD',
    GET_BOARD_CARD: 'GET_BOARD_CARD',
    SELECT_CARD: 'SELECT_BOARD_CARD'
} as const;

interface IGetBoardsAction {
    type: typeof BOARD_ACTIONS.GET_BOARDS;
    data: undefined;
}

interface ISelectBoardAction {
    type: typeof BOARD_ACTIONS.SELECT_BOARD;
    data: BoardModel;
}

interface ICreateBoardAction {
    type: typeof BOARD_ACTIONS.CREATE_BOARD;
    data: INewBoard;
}

interface IGetBoardAction {
    type: typeof BOARD_ACTIONS.GET_BOARD;
    data: BoardModel;
}
interface ISetBoardsAction {
    type: typeof BOARD_ACTIONS.BOARDS;
    data: BoardModel[];
}
interface IGetBoardCardAction {
    type: typeof BOARD_ACTIONS.GET_BOARD_CARD;
    data: IBoardCard;
}

interface ISelectCardAction {
    type: typeof BOARD_ACTIONS.SELECT_CARD;
    data: IBoardCard;
}


export type IBoardAction = IGetBoardAction | IGetBoardsAction | ISelectBoardAction | ICreateBoardAction | ISetBoardsAction | IGetBoardCardAction | ISelectCardAction

export const setBoardsAction = (boards: BoardModel[]) => ({ type: BOARD_ACTIONS.BOARDS, data: boards })
export const getBoardsAction = () => ({ type: BOARD_ACTIONS.GET_BOARDS });
export const selectBoardAction = (board: BoardModel) => ({ type: BOARD_ACTIONS.SELECT_BOARD, data: board });
export const createBoardAction = (newBoard: INewBoard) => ({ type: BOARD_ACTIONS.CREATE_BOARD, data: newBoard });
export const getBoardAction = (boardId: string) => ({ type: BOARD_ACTIONS.GET_BOARD, data: BoardModel.generateBoard(boardId) });
export const getBoardCardAction = (card: IBoardCard) => ({ type: BOARD_ACTIONS.GET_BOARD_CARD, data: new CardModel(card) });
export const selectCardAction = (card: IBoardCard) => ({ type: BOARD_ACTIONS.SELECT_CARD, data: card });


