import { ChangeEvent, CSSProperties, FunctionComponent } from "react";
import "./input.css";

interface IInputProps {
  label?: string;
  placeholder?: string;
  style?: CSSProperties;
  onChanged?: (event: ChangeEvent<HTMLInputElement>) => any;
  value?: string;
}

export const Input: FunctionComponent<IInputProps> = ({
  label,
  placeholder,
  style,
  onChanged,
  value,
}) => {
  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input
        className="input-text"
        placeholder={placeholder}
        style={style}
        onChange={onChanged}
        value={value}
      />
    </div>
  );
};
