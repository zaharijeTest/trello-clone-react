import { IActivity, IBoardCard } from "../@types/card";
import { IMember } from "../@types/member";

export class CardModel implements IBoardCard {
    id: string;
    name: string;
    closed: boolean;
    desc: string;
    idMembers: string[];
    pos: number;
    idList: string;
    members: IMember[];
    idBoard: string;
    labels: { color: string; id: string; idBoard: string; name: string; }[];
    actions: IActivity[];

    constructor(args: any = {}) {
        this.id = args.id;
        this.idBoard = args.idBoard;
        this.idList = args.idList;
        this.name = args.name || '';
        this.desc = args.desc || '';
        this.closed = args.closed || false;
        this.idMembers = args.idMembers || [];
        this.members = args.members || [];
        this.labels = args.labels || [];
        this.actions = args.actions ? args.actions.filter((action) => action.type === 'commentCard') : [];
    }
}
