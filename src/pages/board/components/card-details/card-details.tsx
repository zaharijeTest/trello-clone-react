import { FunctionComponent } from 'react';
import { IBoardCard } from '../../../../@types/card';
import { IList } from '../../../../@types/list';
import { INullable } from '../../../../@types/store';
import { COLORS } from '../../../../config/colors';
import { Button } from '../../../../shared/components/button/button';
import { Title } from '../../../../shared/components/title/title';
import { Activity } from '../activity/activity';
import { Member } from '../member/member';
import './card-details.css';



interface ICardDetailsProps {
    card?: INullable<IBoardCard>;
    list?: IList;
}

export const CardDetails: FunctionComponent<ICardDetailsProps> = ({ card, list }) => {

    return (
        <div className="card-details-wrapper">
            <div className="card-details-header">
                <div className="card-details-title"></div>
                <Title>{card?.name}</Title>
                <span> in list </span> <span>{list?.name}</span>
            </div>
            <div className="card-details-meta">
                <div>
                    <span className="card-details-members-title">MEMBERS</span>
                    <div className="card-details-members">
                        {card?.members.map(member => <Member key={member.id} member={member}></Member>)}
                    </div>
                </div>
                <div>
                    <span className="card-details-labels-title">LABELS</span>
                    <div className="card-details-labels" style={{ display: 'flex', gap: '5px' }}>
                        {card?.labels.map(label => <Button key={label.name} color={COLORS[label.color]}><span>{label.name}</span></Button>)}
                    </div>
                </div>

            </div>
            <div className="card-details-description-wrapper">
                <span className="card-details-description-title">Description </span>
                <div className="card-details-description">{card?.desc}</div>
            </div>
            <div className="card-details-activity-wrapper">
                <span className="card-details-activity-title">Activity</span>
                <div className="card-details-activity">
                    {card?.actions.map((action, index) => <Activity key={index} activity={action}></Activity>)}
                </div>
            </div>
        </div>
    )
}
