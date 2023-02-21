import { useEffect, useState, useCallback } from "react";
import { ICard } from "./types";
import { getRandom, shuffleArray } from "./utils";
import emojis from "./emojis";

const useMemoryGame = ({ cardsNumber = 6 }) => {
  const getRandomCards = useCallback(() => {
    const randomEmojis = getRandom(emojis, Math.floor(cardsNumber / 2));
    return shuffleArray([...randomEmojis, ...randomEmojis]).map((i) => ({
      emoji: i,
      isGuessed: false,
      isPicked: false,
    }));
  }, [cardsNumber]);

  const [cards, setCards] = useState<ICard[]>(getRandomCards());
  const [move, setMove] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const onPickCard = (index: number) => {
    setCards(
      cards.map((card, i) =>
        i === index ? { ...card, isPicked: true } : { ...card }
      )
    );
    setMove(move + 1);
  };

  const resetGame = useCallback(() => {
    setMove(0);
    setIsGameWon(false);
    setCards(getRandomCards());
  }, [getRandomCards]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

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
    setIsDisabled(true);
    const pickedCards = cards.filter((card) => card.isPicked === true);

    if (pickedCards.length === 2) {
      setTimeout(() => {
        if (pickedCards[0].emoji === pickedCards[1].emoji) {
          makePickedGuessed();
          setIsDisabled(false);
        } else {
          resetPickedIcons();
          setIsDisabled(false);
        }
      }, 500);
    } else {
      setIsDisabled(false);
    }
  }, [cards, makePickedGuessed, resetPickedIcons]);

  useEffect(() => {
    const guessedCardsNumber = cards.reduce(
      (acc, { isGuessed }) => (isGuessed ? acc + 1 : acc),
      0
    );
    if (guessedCardsNumber === cards.length) {
      setIsGameWon(true);
    }
  }, [cards]);

  return {
    cards,
    onPickCard,
    isDisabled,
    isGameWon,
    resetGame,
    move,
  };
};

export default useMemoryGame;
