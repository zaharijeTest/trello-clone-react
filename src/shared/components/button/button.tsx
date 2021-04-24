import React from "react";
import { FunctionComponent } from "react";
import { COLORS } from "../../../config/colors";
import './button.css';

interface IButtonProps {
  onClicked?: () => any;
  color?: string;
  disabled?: boolean;
}

export const Button:FunctionComponent<IButtonProps> = (props) => {
  return (
    <button className="button-wrapper" style={{backgroundColor: !props.disabled ? props.color || COLORS.GREEN : COLORS.GRAY}} onClick={props.onClicked || (() => {})} disabled={props.disabled}>
      <span className="button-text">{props.children}</span>
    </button>

  )
}
