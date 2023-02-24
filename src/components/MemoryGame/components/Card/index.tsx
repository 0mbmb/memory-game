import s from "./Card.module.scss";
import { ICard } from "../../types";

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
  return (
    <button
      type="button"
      className={`${s.card} ${(isPicked || isGuessed) && s.cardPicked}`}
      onClick={onPickCard}
      disabled={isGuessed || isPicked || isDisabled}
    >
      <span>{isGuessed || isPicked ? emoji : ""}</span>
    </button>
  );
};

export default Card;
