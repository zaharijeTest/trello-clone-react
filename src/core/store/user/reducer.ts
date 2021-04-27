import { INullable } from "../../../@types/store";
import { IUser } from "../../../@types/user";
import { IUserAction, USER_ACTIONS } from "./actions";


export interface IUserStore {
  user?: INullable<IUser>
}

const initialState: IUserStore = {
  user: undefined,
}

export const userReducers = (state = initialState, action: IUserAction): IUserStore => {
  switch (action.type) {
    case USER_ACTIONS.USER:
      return {...state, user: action.data};
    default:
      return state;
  }
};
