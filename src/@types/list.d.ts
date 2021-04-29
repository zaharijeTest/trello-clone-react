import { IBoardCard } from "./card";

export interface IList {
  id: string;
  name: string;
  closed: boolean;
  idBoard: string;
  pos: number;
  subscribed: boolean;
  cards: IBoardCard[];
}
