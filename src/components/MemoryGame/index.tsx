import Card from "./components/Card";
import s from "./MemoryGame.module.scss";
import useMemoryGame from "./useMemoryGame";
import Overlay from "./components/Overlay";
import Button from "./components/Button";
import "./styles.scss";

import { useState } from "react";

const cardsNumberOptions = [
  // 6,
  8,
  // 12, 16, 20, 24, 28, 30, 36, 40, 42, 48, 54, 56, 60, 70, 72, 80, 90, 100,
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
    <div className="memory-game">
      <div className={s.controls}>
        <p>Move: {move}</p>
        <Button onClick={resetGame} dark>
          Reset
        </Button>
      </div>
      <div
        className={s.board}
        style={{
          // gridTemplateColumns: `repeat(auto-fit, minmax(75px, ${100 / 7}%))`,
          gridTemplateColumns: `repeat(4, 1fr)`,
        }}
      >
        {isInitialState && (
          <Overlay>
            <p>Choose field size:</p>
            {cardsNumberOptions.map((option) => (
              <Button
                key={option}
                type="button"
                onClick={() => {
                  onFieldSizeChoose(option);
                }}
              >
                {option}
              </Button>
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
    </div>
  );
};

export default MemoryGame;
