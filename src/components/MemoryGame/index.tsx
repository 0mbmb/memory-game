import Card from "./components/Card";
import s from "./MemoryGame.module.scss";
import useMemoryGame from "./useMemoryGame";
import Overlay from "./components/Overlay";
import Button from "./components/Button";
import Switch from "./components/Switch";
import "./styles.scss";

import { useState } from "react";

const cardsNumberOptions = [
  6, 8, 12, 16, 20, 24, 28, 30, 36, 40, 42, 48, 54, 56, 60, 70, 72, 80, 90, 100,
];

const MemoryGame = () => {
  const [cardsNumber, setCardsNumber] = useState<number>(16);
  const [isNewGame, setIsNewGame] = useState(true);

  const { cards, onPickCard, isDisabled, isGameWon, resetGame, move } =
    useMemoryGame({ cardsNumber });

  const onFieldSizeChoose = (cardsNum: number) => {
    setCardsNumber(cardsNum);
    setIsNewGame(false);
  };

  const onNewGame = () => {
    resetGame();
    setIsNewGame(true);
  };

  return (
    <div className="memory-game">
      <div className={s.controls}>
        <p>Move: {move}</p>
        <div className={s.controlsButtons}>
          <Button onClick={onNewGame} dark>
            New game
          </Button>
          <Button onClick={resetGame} dark>
            Reset
          </Button>
        </div>
      </div>
      <div
        className={s.board}
        style={{
          // gridTemplateColumns: `repeat(auto-fit, minmax(75px, ${100 / 7}%))`,
          gridTemplateColumns: `repeat(4, 1fr)`,
        }}
      >
        {isNewGame && (
          <Overlay>
            <p className={s.newMessage}>Choose field size:</p>
            <ul className={s.newButtons}>
              {cardsNumberOptions.map((option) => (
                <li>
                  <Button
                    key={option}
                    type="button"
                    onClick={() => {
                      onFieldSizeChoose(option);
                    }}
                  >
                    {option}
                  </Button>
                </li>
              ))}
            </ul>
            <p className={s.newMessage}>Difficulty:</p>
            <Switch leftText="Normal" rightText="Hardcore" />
          </Overlay>
        )}
        {isGameWon && (
          <Overlay>
            <p className={s.wonMessage}>You won in {move} moves!</p>
            <div className={s.wonButtons}>
              <Button onClick={resetGame}>Reset</Button>
              <Button onClick={onNewGame}>New game</Button>
            </div>
          </Overlay>
        )}
        {cards.map(({ emoji, isGuessed, isPicked }, index) => (
          <Card
            key={`${emoji}-${index}`}
            emoji={emoji}
            isGuessed={isGuessed}
            isPicked={isPicked}
            isDisabled={isDisabled || isNewGame}
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
