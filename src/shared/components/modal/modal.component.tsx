import { FunctionComponent } from "react";
import "./modal.css";

interface IModalProps {
  header?: string;
  onCloseClicked: (val) => any;
}

export const Modal: FunctionComponent<IModalProps> = ({
  onCloseClicked,
  children,
  header,
}) => {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-header">{header}</div>
        <div className="modal-close" onClick={onCloseClicked}>
          X
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};
