import { FunctionComponent } from "react";
import { IBoardCard } from "../../../../@types/card";
import { Member } from "../member/member";
import './card-tile.css';

interface ICardTileProps {
    card: IBoardCard
}
export const CardTile: FunctionComponent<ICardTileProps> = ({ card }) => (
    <div className="card-wrapper">
        <div className="card-name">{card.name}</div>
        <div className="card-meta-data">
            <div className="card-activity">
                <span className="card-activity-icon"></span>
                <span className="card-activity-number"></span>
            </div>
            <div className="flex">
                {card.members.map(member => <Member key={member.id} member={member}></Member>)}
            </div>
        </div>
    </div>

)