import { FunctionComponent } from "react";
import { IActivity } from "../../../../@types/card";
import { TrelloService } from "../../../../core/api/trello.service";
import { formatDate } from "../../../../utils/date.util";
import "./activity.css";

interface IActivityProps {
  activity: IActivity;
}

const trelloService = new TrelloService();

export const Activity: FunctionComponent<IActivityProps> = ({ activity }) => (
  <div>
    <div className="card-details-activity-member-wrapper">
      <img
        alt={activity.memberCreator.fullName}
        className="card-details-activity-member-avatar card-details-members-avatar"
        src={trelloService.generateAvatarUrl(activity.memberCreator.avatarUrl)}
      />
      <div className="card-details-activity-meta">
        <span className="card-details-activity-member-name">
          {activity.memberCreator.fullName || activity.memberCreator.id}
        </span>
        <span className="card-details-activity-date">
          {" "}
          {formatDate(activity.date)}
        </span>
        <div className="card-details-activity-comment">
          {activity.data.text}
        </div>
      </div>
    </div>
  </div>
);
