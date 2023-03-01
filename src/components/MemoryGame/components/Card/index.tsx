import s from "./Card.module.scss";
import { ICard } from "../../types";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";

interface CardProps extends ICard {
  onPickCard: () => void;
  isDisabled: boolean;
}

const Card = ({
  emoji,
  isGuessed,
  isPicked,
  isDisabled,
  onPickCard,
}: CardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <CSSTransition
      in={isPicked || isGuessed}
      timeout={200}
      classNames={{
        enter: s.enter,
        enterActive: s.enterActive,
        enterDone: s.enterDone,
        exit: s.exit,
        exitActive: s.exitActive,
        exitDone: s.exitDone,
      }}
      onEntered={() => {
        setIsAnimating(true);
      }}
      onExited={() => {
        setIsAnimating(false);
      }}
    >
      <button
        type="button"
        className={s.card}
        onClick={onPickCard}
        disabled={isGuessed || isPicked || isDisabled || isAnimating}
      >
        <span className={`${s.cardCover} cover`}></span>
        <span className={`${s.cardEmoji} emoji`}>{emoji}</span>
      </button>
    </CSSTransition>
  );
};

export default Card;
