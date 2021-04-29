import { INewBoard } from "../../../@types/board";
import { BoardModel } from "../../../models/board.model";

export const BOARD_ACTIONS = {
  GET_BOARDS: "GET_BOARDS",
  BOARDS: "BOARDS",
  SELECT_BOARD: "SELECT_BOARD",
  CREATE_BOARD: "CREATE_BOARD",
  GET_BOARD: "GET_BOARD",
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

export type IBoardAction =
  | IGetBoardAction
  | IGetBoardsAction
  | ISelectBoardAction
  | ICreateBoardAction
  | ISetBoardsAction;

export const setBoardsAction = (boards: BoardModel[]) => ({
  type: BOARD_ACTIONS.BOARDS,
  data: boards,
});
export const getBoardsAction = () => ({ type: BOARD_ACTIONS.GET_BOARDS });
export const selectBoardAction = (board: BoardModel) => ({
  type: BOARD_ACTIONS.SELECT_BOARD,
  data: board,
});
export const createBoardAction = (newBoard: INewBoard) => ({
  type: BOARD_ACTIONS.CREATE_BOARD,
  data: newBoard,
});
export const getBoardAction = (boardId: string) => ({
  type: BOARD_ACTIONS.GET_BOARD,
  data: BoardModel.generateBoard(boardId),
});
