import React, { FunctionComponent, useContext, useRef, useState } from "react";
import { IActivity } from "../../../../@types/card";
import { UserContext } from "../../../../context/user.context";
import { Button } from "../../../../shared/components/button/button";
import { Input } from "../../../../shared/components/input/input.component";
import { formatDate } from "../../../../utils/date.util";
import { Member } from "../member/member";
import "./activity.css";

interface IActivityProps {
  activity?: IActivity;
  isNew?: boolean;
  onSaveClicked?: (message: string) => any;
}

export const Activity: FunctionComponent<IActivityProps> = ({
  activity,
  isNew,
  onSaveClicked = () => {},
}) => {
  const user = useContext(UserContext);
  const [{ focused, newComment }, setState] = useState<{
    focused?: boolean;
    newComment: string;
  }>({ focused: false, newComment: "" });

  return (
    <div>
      {activity && (
        <div className="card-details-activity-member-wrapper">
          <Member member={activity.memberCreator} />
          <div className="card-details-activity-meta">
            <div className="card-details-activity-info">
              <span className="card-details-activity-member-name">
                {activity.memberCreator.fullName || activity.memberCreator.id}
              </span>
              <span className="card-details-activity-date">
                {formatDate(activity.date)}
              </span>
            </div>
            <div className="card-details-activity-comment">
              {activity.data.text}
            </div>
          </div>
        </div>
      )}
      {isNew && user && (
        <div className="card-details-activity-member-wrapper">
          <Member member={user} />
          <div className="card-details-activity-meta">
            <div className="card-details-activity-comment">
              <Input
                style={{ color: "black", cursor: "pointer" }}
                multiline={true}
                onFocused={(isFocused) =>
                  setState((state) => ({ ...state, focused: isFocused }))
                }
                value={newComment}
                placeholder="Add a comment..."
                onInput={(newValue) =>
                  setState((state) => ({ ...state, newComment: newValue }))
                }
              />
              {(focused || newComment.length > 0) && (
                <div className="activity-command-bar">
                  <Button
                    disabled={!newComment || newComment.length === 0}
                    onClicked={() => {
                      onSaveClicked(newComment);
                      setState((state) => ({
                        ...state,
                        newComment: "",
                        focused: false,
                      }));
                    }}
                  >
                    <span>Save</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
