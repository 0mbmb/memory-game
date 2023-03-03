import Card from "./components/Card";
import s from "./MemoryGame.module.scss";
import useMemoryGame from "./useMemoryGame";
import Overlay from "./components/Overlay";
import Button from "./components/Button";
import Switch from "./components/Switch";
import "./styles.scss";
import { IGameMode } from "./types";

import { useMemo, useState } from "react";

const cardsNumberOptions = [
  6, 8, 12, 16, 20, 24, 28, 30, 36, 40, 42, 48, 54, 56, 60, 70, 72, 80, 90, 100,
];

const getClassesFromCardsNumber = (cardsNumber: number) => {
  const columns = [3, 4, 5, 6, 7, 8, 9, 10];
  return columns.reduce(
    (acc, column) =>
      cardsNumber % column === 0 && cardsNumber / column > 1
        ? [...acc, `board${column}`]
        : [...acc],
    [] as string[]
  );
};

const MemoryGame = () => {
  const [cardsNumber, setCardsNumber] = useState<number>(16);
  const [gameMode, setGameMode] = useState(IGameMode.NORMAL);
  const [isNewGame, setIsNewGame] = useState(true);

  const { cards, onPickCard, isDisabled, isGameWon, resetGame, move } =
    useMemoryGame({ cardsNumber, gameMode });

  const onFieldSizeChoose = (cardsNum: number) => {
    setCardsNumber(cardsNum);
    setIsNewGame(false);
  };

  const onNewGame = () => {
    resetGame();
    setIsNewGame(true);
  };

  const boardClassNames = useMemo(
    () => getClassesFromCardsNumber(cardsNumber),
    [cardsNumber]
  );

  return (
    <div className={`memory-game-wrapper ${s.memoryGameWrapper}`}>
      <div>
        <Overlay isVisible={isNewGame}>
          <div className={s.newGroup}>
            <p className={s.newMessage}>Choose field size:</p>
            <ul className={s.newButtons}>
              {cardsNumberOptions.map((option) => (
                <li key={option}>
                  <Button
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
          </div>
          <div className={s.newGroup}>
            <p className={s.newMessage}>Difficulty:</p>
            <Switch
              leftText="Normal"
              rightText="Hardcore"
              isChecked={gameMode === IGameMode.HARDCORE}
              setIsChecked={(isChecked) => {
                setGameMode(isChecked ? IGameMode.HARDCORE : IGameMode.NORMAL);
              }}
            />
            <p className={s.newDifficultyMessage}>
              {gameMode === IGameMode.HARDCORE
                ? "*Guess all cards in one go"
                : "*Guessed card pairs stay uncovered"}
            </p>
          </div>
        </Overlay>
        <Overlay isVisible={isGameWon}>
          <p className={s.wonMessage}>You won in {move} moves!</p>
          <div className={s.wonButtons}>
            <Button onClick={onNewGame}>New game</Button>
            <Button onClick={resetGame}>Reset</Button>
          </div>
        </Overlay>
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
          className={`${s.board} ${boardClassNames
            .map((boardClassName) => {
              return s[boardClassName];
            })
            .join(" ")}`}
        >
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
    </div>
  );
};

export default MemoryGame;
