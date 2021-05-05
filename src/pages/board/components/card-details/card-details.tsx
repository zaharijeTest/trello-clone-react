import { FunctionComponent } from "react";
import { IBoardCard } from "../../../../@types/card";
import { IList } from "../../../../@types/list";
import { COLORS } from "../../../../config/colors";
import { TrelloService } from "../../../../core/api/trello.service";
import { Button } from "../../../../shared/components/button/button";
import { Input } from "../../../../shared/components/input/input.component";
import { Activity } from "../activity/activity";
import { Member } from "../member/member";
import "./card-details.css";

interface ICardDetailsProps {
  card: IBoardCard;
  list?: IList;
}

const trelloService = new TrelloService();

export const CardDetails: FunctionComponent<ICardDetailsProps> = ({
  card,
  list,
}) => {
  const updateCardTitle = (newCardName) => {
    trelloService.updateCard(card?.id, { name: newCardName }).then((r) => {
      card.name = newCardName;
    });
  };
  return (
    <div className="card-details-wrapper">
      <div className="card-details-header">
        <div className="card-details-title" />
        <Input
          value={card.name}
          style={{ color: "black" }}
          onChanged={(value) => updateCardTitle(value)}
        />
        <span> in list </span> <span>{list?.name}</span>
      </div>
      <div className="card-details-meta">
        <div>
          <span className="card-details-members-title">MEMBERS</span>
          <div className="card-details-members">
            {card.members?.map((member) => (
              <Member key={member.id} member={member} />
            ))}
          </div>
        </div>
        <div>
          <span className="card-details-labels-title">LABELS</span>
          <div
            className="card-details-labels"
            style={{ display: "flex", gap: "5px" }}
          >
            {card.labels?.map((label) => (
              <Button key={label.name} color={COLORS[label.color]}>
                <span>{label.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="card-details-description-wrapper">
        <span className="card-details-description-title">Description </span>
        <div className="card-details-description">{card.desc}</div>
      </div>
      <div className="card-details-activity-wrapper">
        <span className="card-details-activity-title">Activity</span>
        <div className="card-details-activity">
          {card?.actions.map((action, index) => (
            <Activity key={index} activity={action} />
          ))}
        </div>
      </div>
    </div>
  );
};
