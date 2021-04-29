import { FunctionComponent } from "react";
import { IMember } from "../../../../@types/member";
import { TrelloService } from "../../../../core/api/trello.service";
import "./member.css";

const trelloService = new TrelloService();

interface IMemberProps {
  member: IMember;
}

export const Member: FunctionComponent<IMemberProps> = ({ member }) => (
  <div>
    <img
      alt={member.fullName}
      title={member.fullName}
      className="member-avatar small-margin"
      src={
        member.avatarUrl && trelloService.generateAvatarUrl(member.avatarUrl)
      }
    />
  </div>
);
