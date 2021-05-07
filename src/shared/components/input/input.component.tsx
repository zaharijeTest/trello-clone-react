import React, {
  CSSProperties,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import TextareaAutosize from "react-textarea-autosize";

import "./input.css";

interface IInputProps {
  label?: string;
  placeholder?: string;
  style?: CSSProperties;
  onChanged?: (newValue: string) => any;
  onFocused?: (focused: boolean) => any;
  onInput?: (key: string) => any;
  value?: string;
  multiline?: boolean;
}

export const Input: FunctionComponent<IInputProps> = ({
  label,
  placeholder,
  style,
  onChanged = () => {},
  onFocused = () => {},
  onInput = () => {},
  value,
  multiline = false,
}) => {
  const [controlledValue, setValue] = useState(value || "");

  const handleChange = (newValue) => {
    setValue(newValue);
    onInput(newValue);
  };

  useEffect(() => {
    if (value !== controlledValue) {
      setValue(value || "");
    }
  }, [value]);

  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <TextareaAutosize
        className={`input-text ${!multiline ? "input-single-line" : ""}`}
        placeholder={placeholder}
        // @ts-ignore
        style={style}
        onChange={(e) => handleChange(e.currentTarget.value)}
        onKeyDown={(e) => !multiline && e.key === "Enter" && e.preventDefault()}
        onBlur={(e) => {
          if (e.currentTarget.value !== value) {
            onChanged(e.currentTarget.value);
          }
          onFocused(false);
        }}
        onFocus={() => onFocused(true)}
        value={controlledValue}
      />
    </div>
  );
};
