import { IBoard } from "../@types/board";
import { IBoardCard } from "../@types/card";
import { IList } from "../@types/list";

export class BoardModel implements IBoard {
    id: string;
    name: string;
    idOrganization: string;
    idMemberCreator: string;
    closed: boolean;
    url: string;
    lists: IList[];
    prefs: { backgroundColor: string; backgroundImage: string; };

    constructor(board?: IBoard, cards: IBoardCard[] = []) {
        if (board) {
            this.id = board.id;
            this.name = board.name;
            this.idOrganization = board.idOrganization;
            this.closed = board.closed;
            this.url = board.url;
            this.prefs = board.prefs;
            this.lists = board.lists.map(list => ({ ...list, cards: cards.filter(card => card.idList === list.id) }));
        }
    }

    getBackground() {
        return this.prefs?.backgroundImage ? `url(${this.prefs.backgroundImage})` : this.prefs?.backgroundColor;
    }

    static generateBoard(id: string) {
        const board = new BoardModel();
        board.id = id;
        return board;
    }
}