import { COLORS } from "../../../config/colors";
import './button.css';

interface IButtonProps {
  onClicked?: () => any;
  label?: string;
  color?: string;
  disabled?: boolean;

}
export const Button = (props: IButtonProps) => {

  return (
    <button className="button-wrapper" style={{backgroundColor: !props.disabled ? props.color : COLORS.GRAY}} onClick={props.onClicked} disabled={props.disabled}>
      <span className="button-text">{props.label}</span>
    </button>

  )
}

// export class ButtonComponent extends BaseComponent {
//   constructor({ container, props, }) {
//     super({ container, htmlContent, });
//     this.onClicked = props.onClicked || (() => {});
//     this.label = props.label || "";
//     this.color = props.color || COLORS.GRAY;
//     this.disabled = props.disabled || false;
//     this.init(props);
//   }

//   init() {
//     this.setType();
//     this.setEvents();
//     this.setText();
//     this.setDisabled(this.disabled);
//   }

//   setType() {
//     this.container.style.backgroundColor = this.color;
//   }

//   setEvents() {
//     this.container.addEventListener("click", (e) => {
//       this.onClicked(e);
//     });
//   }

//   setText(text = this.label) {
//     this.buttonTextElement = this.container.querySelector(".button-text");
//     this.buttonTextElement.innerHTML = text;
//   }

//   setDisabled(disabled) {
//     this.container.disabled = disabled;
//     this.disabled = disabled;
//     if (disabled) {
//       this.container.style.backgroundColor = COLORS.GRAY;
//     } else {
//       this.container.style.backgroundColor = this.color;

//     }
//   }
// }
