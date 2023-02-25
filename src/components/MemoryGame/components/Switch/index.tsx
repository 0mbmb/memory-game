import { ComponentPropsWithoutRef } from "react";
import s from "./Switch.module.scss";

interface SwitchProps extends ComponentPropsWithoutRef<"input"> {
  checked: boolean;
  // onChange: (e: ) => void;
  leftText?: string;
  rightText?: string;
}

const Switch = ({
  leftText,
  rightText,
  checked,
  // onChange,
  ...props
}: SwitchProps) => {
  return (
    <div className={s.switch}>
      {!!leftText && (
        <button
          type="button"
          // onClick={(e) => {
          //   onChange(e);
          // }}
        >
          {leftText}
        </button>
      )}
      <div className={s.toggle}>
        <input type="checkbox" id="switch" checked={checked} {...props} />
        <label htmlFor="switch"></label>
      </div>
      {!!rightText && <button type="button">{rightText}</button>}
    </div>
  );
};

export default Switch;
