import { useEffect, useState, useCallback } from "react";
import { ICard } from "./types";
import { getRandom, shuffleArray } from "./utils";
import emojis from "./emojis";

const useMemoryGame = ({ cardsNumber = 6 }) => {
  const randomEmojis = getRandom(emojis, Math.floor(cardsNumber / 2));
  const [cards, setCards] = useState<ICard[]>(
    shuffleArray([...randomEmojis, ...randomEmojis]).map((i) => ({
      emoji: i,
      isGuessed: false,
      isPicked: false,
    }))
  );

  const onPickCard = (index: number) => {
    setCards(
      cards.map((card, i) =>
        i === index ? { ...card, isPicked: true } : { ...card }
      )
    );
  };

  const resetPickedIcons = useCallback(() => {
    setCards(cards.map((card) => ({ ...card, isPicked: false })));
  }, [cards]);

  const makePickedGuessed = useCallback(() => {
    setCards(
      cards.map((card) =>
        card.isPicked
          ? { ...card, isGuessed: true, isPicked: false }
          : { ...card }
      )
    );
  }, [cards]);

  useEffect(() => {
    const pickedCards = cards.filter((card) => card.isPicked === true);
    if (pickedCards.length === 2) {
      setTimeout(() => {
        if (pickedCards[0].emoji === pickedCards[1].emoji) {
          makePickedGuessed();
        } else {
          resetPickedIcons();
        }
      }, 500);
    }
  }, [cards, makePickedGuessed, resetPickedIcons]);

  return {
    cards,
    onPickCard,
  };
};

export default useMemoryGame;
