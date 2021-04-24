import { ACTIONS } from "./actions";

const initialState = {
  activeBoard: {},
  activeCard: {},
  user: null
}
export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.USER_ACTIONS.USER:
      return {...state, user: action.user}
    default:
      return state;
  }
};
