import { FunctionComponent } from "react";
import { IBoardCard } from "../../../../@types/card";
import { Member } from "../member/member";
import "./card-tile.css";

interface ICardTileProps {
  card: IBoardCard;
  onClicked?: () => any;
}
export const CardTile: FunctionComponent<ICardTileProps> = ({
  card,
  onClicked,
}) => (
  <div className="card-wrapper" onClick={onClicked}>
    <div className="card-name">{card.name}</div>
    <div className="card-meta-data">
      <div className="card-activity">
        <span className="card-activity-icon" />
        <span className="card-activity-number" />
      </div>
      <div className="card-bottom">
        <div className="card-more-info">
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </div>
        <div className="flex">
          {card.members.map((member) => (
            <Member key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
