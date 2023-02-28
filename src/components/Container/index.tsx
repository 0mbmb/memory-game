import s from "./Container.module.scss";
import { ComponentPropsWithoutRef, ReactNode } from "react";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={`${s.container}${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
};

export default Container;
