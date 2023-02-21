import s from "./Overlay.module.css";
import { ReactNode } from "react";

interface OverlayProps {
  children?: ReactNode;
}

const Overlay = ({ children }: OverlayProps) => {
  return <div className={s.overlay}>{children}</div>;
};

export default Overlay;
