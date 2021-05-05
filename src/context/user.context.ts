import { createContext } from "react";
import { INullable } from "../@types/store";
import { IUser } from "../@types/user";

export const UserContext = createContext<INullable<IUser>>(null);