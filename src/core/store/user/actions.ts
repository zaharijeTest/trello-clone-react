import { IUser } from "../../../@types/user";

export const USER_ACTIONS = {
  GET_USER: "GET_USER",
  USER: "USER",
} as const;

interface IGetUserAction {
  type: typeof USER_ACTIONS.GET_USER;
  data: undefined;
}

interface ISetUserAction {
  type: typeof USER_ACTIONS.USER;
  data: IUser;
}

export type IUserAction = IGetUserAction | ISetUserAction;

export const getUserAction = () => ({ type: USER_ACTIONS.GET_USER });
export const setUserAction = (user: IUser) => ({
  type: USER_ACTIONS.USER,
  data: user,
});
