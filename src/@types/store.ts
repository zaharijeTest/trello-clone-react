import { IBoard } from "./board";
import { IUser } from "./user";

export interface IStore {
    user?: IUser | null;
    boards: IBoard[]
}