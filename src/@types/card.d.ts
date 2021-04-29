import { IMember } from "./member";

export interface IBoardCard {
  id: string;
  name: string;
  closed: boolean;
  desc: string;
  idMembers: string[];
  pos: number;
  idList: string;
  members: IMember[];
  idBoard: string;
  labels: {
    color: string;
    id: string;
    idBoard: string;
    name: string;
  }[];
  actions: IActivity[];
}

export interface IActivity {
  date: Date;
  type: "commentCard";
  data: {
    text: string;
  };
  memberCreator: {
    activityBlocked: boolean;
    avatarHash: string;
    avatarUrl: string;
    fullName: string;
    id: string;
    idMemberReferrer: string;
    initials: string;
    nonPublic: {};
    nonPublicAvailable: boolean;
    username: string;
  };
}
