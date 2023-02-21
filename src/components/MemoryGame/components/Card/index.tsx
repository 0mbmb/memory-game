import s from "./Card.module.css";
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
      className={s.card}
      onClick={onPickCard}
      disabled={isGuessed || isPicked || isDisabled}
    >
      {isGuessed || isPicked ? emoji : ""}
    </button>
  );
};

export default Card;
