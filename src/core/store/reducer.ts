import { IStore } from "../../@types/store";
import { ACTIONS } from "./actions";

const initialState: IStore = {
  boards: [],
  user: undefined,
  selectedBoard: null,
  newBoard: null
}
export const reducers = (state = initialState, action: { type: any; data: any; }) => {
  switch (action.type) {
    case ACTIONS.USER_ACTIONS.USER:
      return {...state, user: action.data};
    case ACTIONS.BOARD_ACTIONS.BOARDS:
      return {...state, boards: action.data};
    case ACTIONS.BOARD_ACTIONS.SELECT_BOARD:
      return {...state, selectedBoard: action.data};
      case ACTIONS.BOARD_ACTIONS.CREATE_BOARD:
        return {...state, newBoard: action.data};
    default:
      return state;
  }
};
