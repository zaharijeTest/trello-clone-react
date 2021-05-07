import React, { FunctionComponent, useState } from "react";
import { IBoardCard } from "../../../../@types/card";
import { IList } from "../../../../@types/list";
import { COLORS } from "../../../../config/colors";
import { TrelloService } from "../../../../core/api/trello.service";
import { Button } from "../../../../shared/components/button/button";
import { Input } from "../../../../shared/components/input/input.component";
import { Activity } from "../activity/activity";
import { Member } from "../member/member";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./card-details.css";
import {
  faAlignLeft,
  faIdCard,
  faList,
} from "@fortawesome/free-solid-svg-icons";

interface ICardDetailsProps {
  card: IBoardCard;
  list?: IList;
}

const trelloService = new TrelloService();

export const CardDetails: FunctionComponent<ICardDetailsProps> = ({
  card,
  list,
}) => {
  const [, setCardUpdated] = useState(card);

  const updateCardTitle = (newCardName) => {
    trelloService.updateCard(card?.id, { name: newCardName }).then((r) => {
      card.name = newCardName;
    });
  };

  const createComment = (message: string) => {
    trelloService.createComment(card.id, message).then((r) => {
      card.actions.unshift(r);
      setCardUpdated((cardUpdated) => ({ ...cardUpdated }));
    });
    setCardUpdated((cardUpdated) => ({ ...cardUpdated }));
  };
  return (
    <div className="card-details-wrapper">
      <div className="card-details-header flex flex-gap-10">
        <FontAwesomeIcon icon={faIdCard} className="icon-normal" />
        <div className="card-details-title">
          <Input
            value={card.name}
            style={{ color: "black", fontWeight: 600, fontSize: "20px" }}
            onChanged={(value) => updateCardTitle(value)}
          />
          <span> in list </span> <span>{list?.name}</span>
        </div>
      </div>
      <div className="card-details-content">
        <div className="card-details-info-wrapper">
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
                  <Button
                    key={label.name}
                    color={COLORS[label.color] || label.color}
                  >
                    <span>{label.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="card-details-description-wrapper">
            <div className="display-center flex-gap-10">
              <FontAwesomeIcon icon={faAlignLeft} className="icon-normal" />
              <span className="card-details-description-title">
                Description{" "}
              </span>
            </div>
            <div className="card-details-description">{card.desc}</div>
          </div>
          <div className="card-details-activity-wrapper">
            <div className="display-center flex-gap-10">
              <FontAwesomeIcon icon={faList} className="icon-normal" />
              <span className="card-details-activity-title">Activity</span>
            </div>
            <div className="card-details-activity">
              <Activity isNew={true} onSaveClicked={createComment} />
              {card.actions?.map((action, index) => (
                <Activity key={index} activity={action} />
              ))}
            </div>
          </div>
        </div>
        <div className="card-details-command-wrapper">
          <div>
            <span className="card-details-members-title">ADD TO CARD</span>
            <div className="card-details-command-group">
              <span className="button-link">
                <span>Members</span>
              </span>
              <span className="button-link">
                <span>Labels</span>
              </span>
              <span className="button-link">
                <span>Checklist</span>
              </span>
              <span className="button-link">
                <span>Due date</span>
              </span>
              <span className="button-link">
                <span>Attachment</span>
              </span>
              <span className="button-link">
                <span>Cover</span>
              </span>
            </div>
          </div>
          <div>
            <span className="card-details-members-title">ACTIONS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
