import { CSSProperties, FunctionComponent, useState } from "react";
import "./input.css";

interface IInputProps {
  label?: string;
  placeholder?: string;
  style?: CSSProperties;
  onChanged?: (newValue: string) => any;
  value?: string;
}

export const Input: FunctionComponent<IInputProps> = ({
  label,
  placeholder,
  style,
  onChanged,
  value,
}) => {
  const [controlledValue, setValue] = useState(value);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input
        className="input-text"
        placeholder={placeholder}
        style={style}
        onChange={(e) => handleChange(e.currentTarget.value)}
        onBlur={(e) =>
          onChanged && e.currentTarget.value !== value
            ? onChanged(e.currentTarget.value)
            : null
        }
        value={controlledValue}
      />
    </div>
  );
};
