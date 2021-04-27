import { IBoardStore } from "../core/store/board/reducer";
import { IUserStore } from "../core/store/user/reducer";

export interface IStore {
    userStore: IUserStore
    boardsStore: IBoardStore
}

export type INullable<T> = T | null | undefined 
export type IDispatch = (...args:any) => {type: string}
export type IMapToProps<S,D=any> = [(store: IStore) => S, D]