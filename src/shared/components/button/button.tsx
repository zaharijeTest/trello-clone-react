import { FunctionComponent } from "react";
import { COLORS } from "../../../config/colors";
import './button.css';

interface IButtonProps {
  onClicked?: () => any;
  color?: string;
  disabled?: boolean;
  transparent?: boolean;
}

export const Button: FunctionComponent<IButtonProps> = (props) => {
  return (
    <button className="button-wrapper" style={{ backgroundColor: !props.disabled ? (props.color || (props.transparent ? `hsla(0,0%,100%,.3)` : COLORS.GREEN)) : COLORS.GRAY }} onClick={props.onClicked || (() => { })} disabled={props.disabled}>
      {props.children}
    </button>

  )
}
