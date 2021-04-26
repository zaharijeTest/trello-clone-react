import { IBoard, INewBoard } from "./board";
import { IUser } from "./user";

export interface IStore {
    user: INullable<IUser>
    boards: IBoard[]
    selectedBoard: INullable<IBoard>
    newBoard: INullable<INewBoard>
}

export type INullable<T> = T | null | undefined 
export type IDispatch = (...args:any) => {type: string}
export type IMapToProps<S,D=any> = [(store: IStore) => S, D]