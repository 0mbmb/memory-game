import { ReactNode, ComponentPropsWithoutRef } from "react";
import s from "./Button.module.scss";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children?: ReactNode;
  dark?: boolean;
}

const Button = ({ children, dark = false, ...props }: ButtonProps) => {
  return (
    <button
      className={`${s.button} ${dark ? s["button--dark"] : s["button--light"]}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
