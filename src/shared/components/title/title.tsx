import { FunctionComponent } from "react";
import "./title.css";

interface ITitleProps {}

export const Title: FunctionComponent<ITitleProps> = ({ children }) => (
  <div>
    <h3 className="title-text">{children}</h3>
  </div>
);
