import { ComponentPropsWithoutRef } from "react";
import s from "./Switch.module.scss";

interface SwitchProps extends ComponentPropsWithoutRef<"input"> {
  leftText?: string;
  rightText?: string;
}

const Switch = ({ leftText, rightText, ...props }: SwitchProps) => {
  return (
    <div className={s.switch}>
      {!!leftText && <button type="button">{leftText}</button>}
      <div className={s.toggle}>
        <input type="checkbox" id="switch" {...props} />
        <label htmlFor="switch"></label>
      </div>
      {!!rightText && <button type="button">{rightText}</button>}
    </div>
  );
};

export default Switch;
