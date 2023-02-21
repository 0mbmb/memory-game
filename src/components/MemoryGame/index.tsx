import Card from "./components/Card";
import s from "./MemoryGame.module.css";
import useMemoryGame from "./useMemoryGame";
import Overlay from "./components/Overlay";

import { useState } from "react";

const cardsNumberOptions = [
  6, 8, 12, 16, 20, 24, 28, 30, 36, 40, 42, 48, 54, 56, 60, 70, 72, 80, 90, 100,
];

const MemoryGame = () => {
  const [cardsNumber, setCardsNumber] = useState<number>(8);
  const [isInitialState, setIsInitialState] = useState(true);

  const { cards, onPickCard, isDisabled, isGameWon, resetGame, move } =
    useMemoryGame({ cardsNumber });

  const onFieldSizeChoose = (cardsNum: number) => {
    setCardsNumber(cardsNum);
    setIsInitialState(false);
  };

  return (
    <div
      className={s.board}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(75px, ${100 / 7}%))`,
      }}
    >
      {isInitialState && (
        <Overlay>
          Choose field size:
          {cardsNumberOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onFieldSizeChoose(option);
              }}
            >
              {option}
            </button>
          ))}
        </Overlay>
      )}
      {isGameWon && (
        <Overlay>
          <p>Moves: {move}</p>
          <button type="button" onClick={resetGame}>
            Reset
          </button>
        </Overlay>
      )}

      {cards.map(({ emoji, isGuessed, isPicked }, index) => (
        <Card
          key={`${emoji}-${index}`}
          emoji={emoji}
          isGuessed={isGuessed}
          isPicked={isPicked}
          isDisabled={isDisabled || isInitialState}
          onPickCard={() => {
            onPickCard(index);
          }}
        />
      ))}
    </div>
  );
};

export default MemoryGame;
