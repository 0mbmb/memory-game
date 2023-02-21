import s from "./Card.module.css";
import { ICard } from "../../types";

interface CardProps extends ICard {
  onPickCard: () => void;
}

const Card = ({ emoji, isGuessed, isPicked, onPickCard }: CardProps) => {
  return (
    <button
      type="button"
      className={s.card}
      onClick={onPickCard}
      disabled={isGuessed || isPicked}
    >
      {isGuessed || isPicked ? emoji : "X"}
    </button>
  );
};

export default Card;
