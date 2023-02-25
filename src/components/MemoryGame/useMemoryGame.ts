import { useEffect, useState, useCallback } from "react";
import { ICard } from "./types";
import { getRandom, shuffleArray } from "./utils";
import emojis from "./emojis";
import { IGameMode } from "./types";

const NEXT_MOVE_DELAY = 500;

const useMemoryGame = ({ cardsNumber = 6, gameMode = IGameMode.NORMAL }) => {
  const getRandomCards = useCallback(() => {
    const randomEmojis = getRandom(emojis, Math.floor(cardsNumber / 2));
    return shuffleArray([...randomEmojis, ...randomEmojis]).map((i) => ({
      emoji: i,
      isGuessed: false,
      isPicked: false,
    }));
  }, [cardsNumber]);

  const [cards, setCards] = useState<ICard[]>(getRandomCards());
  const [pickedCards, setPickedCards] = useState<ICard[]>([]);
  const [move, setMove] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const onPickCard = (index: number) => {
    setCards(
      cards.map((card, i) =>
        i === index ? { ...card, isPicked: true } : { ...card }
      )
    );
    setPickedCards([...pickedCards, cards[index]]);
    setMove(move + 1);
  };

  const resetGame = useCallback(() => {
    setMove(0);
    setIsGameWon(false);
    setCards(getRandomCards());
    setPickedCards([]);
  }, [getRandomCards]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const resetPickedCards = useCallback(() => {
    setCards(cards.map((card) => ({ ...card, isPicked: false })));
    setPickedCards([]);
  }, [cards]);

  const makePickedGuessed = useCallback(() => {
    setCards(
      cards.map((card) =>
        card.isPicked
          ? { ...card, isGuessed: true, isPicked: false }
          : { ...card }
      )
    );
    setPickedCards([]);
  }, [cards]);

  useEffect(() => {
    setIsDisabled(true);
    if (pickedCards.length !== 0 && pickedCards.length % 2 === 0) {
      if (
        pickedCards[pickedCards.length - 2].emoji ===
        pickedCards[pickedCards.length - 1].emoji
      ) {
        if (gameMode === IGameMode.NORMAL) {
          makePickedGuessed();
        }
        setIsDisabled(false);
      } else {
        setTimeout(() => {
          resetPickedCards();
          setIsDisabled(false);
        }, NEXT_MOVE_DELAY);
      }
    } else {
      setIsDisabled(false);
    }
  }, [gameMode, makePickedGuessed, pickedCards, resetPickedCards]);

  useEffect(() => {
    if (gameMode === IGameMode.NORMAL) {
      // Normal
      const guessedCardsNumber = cards.reduce(
        (acc, { isGuessed }) => (isGuessed ? acc + 1 : acc),
        0
      );
      if (guessedCardsNumber === cards.length) {
        setTimeout(() => {
          setIsGameWon(true);
        }, NEXT_MOVE_DELAY);
      }
    } else {
      // Hardcore
      if (pickedCards.length === cards.length) {
        setTimeout(() => {
          setIsGameWon(true);
        }, NEXT_MOVE_DELAY);
      }
    }
  }, [cards, gameMode, pickedCards]);

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
