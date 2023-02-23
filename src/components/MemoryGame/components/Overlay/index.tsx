import s from "./Overlay.module.scss";
import { ReactNode } from "react";

interface OverlayProps {
  children?: ReactNode;
}

const Overlay = ({ children }: OverlayProps) => {
  return (
    <div className={s.overlay}>
      <div className={s.content}>{children}</div>
    </div>
  );
};

export default Overlay;
