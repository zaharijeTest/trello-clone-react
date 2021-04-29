import { INewBoard } from "../../../@types/board";
import { INullable } from "../../../@types/store";
import { BoardModel } from "../../../models/board.model";
import { CardModel } from "../../../models/card.model";
import { BOARD_ACTIONS, IBoardAction } from "./actions";

export interface IBoardStore {
  selectedBoard?: INullable<BoardModel>;
  boards: BoardModel[];
  newBoard: INullable<INewBoard>;
  selectedCard: INullable<CardModel>;
}
const initialState: IBoardStore = {
  boards: [],
  selectedBoard: null,
  newBoard: null,
  selectedCard: null,
};
export const boardsReducer = (
  state = initialState,
  action: IBoardAction
): IBoardStore => {
  switch (action.type) {
    case BOARD_ACTIONS.BOARDS:
      return { ...state, boards: action.data };
    case BOARD_ACTIONS.SELECT_BOARD:
      return { ...state, selectedBoard: action.data };
    case BOARD_ACTIONS.CREATE_BOARD:
      return { ...state, newBoard: action.data };
    case BOARD_ACTIONS.GET_BOARD:
      return { ...state, selectedBoard: action.data };
    default:
      return state;
  }
};
