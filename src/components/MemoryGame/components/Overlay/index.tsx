import s from "./Overlay.module.scss";
import { ReactNode } from "react";
import { CSSTransition } from "react-transition-group";

interface OverlayProps {
  isVisible?: boolean;
  children?: ReactNode;
}

const Overlay = ({ isVisible = true, children }: OverlayProps) => {
  return (
    <CSSTransition
      in={isVisible}
      timeout={200}
      classNames={{
        enter: s.enter,
        enterActive: s.enterActive,
        enterDone: s.enterDone,
        exit: s.exit,
        exitActive: s.exitActive,
        exitDone: s.exitDone,
      }}
      mountOnEnter
      unmountOnExit
    >
      <div className={s.overlay}>
        <div className={s.content}>{children}</div>
      </div>
    </CSSTransition>
  );
};

export default Overlay;
