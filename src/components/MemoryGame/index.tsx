import Card from "./components/Card";
import s from "./MemoryGame.module.css";
import useMemoryGame from "./useMemoryGame";

// game size: 28, 40, 48, 56, 60, 72, 80, 100

const MemoryGame = () => {
  const cardsNumber = 28;
  const { cards, onPickCard } = useMemoryGame({ cardsNumber });

  return (
    <div
      className={s.board}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(75px, ${100 / 7}%))`,
      }}
    >
      {cards.map(({ emoji, isGuessed, isPicked }, index) => (
        <Card
          key={`${emoji}-${index}`}
          emoji={emoji}
          isGuessed={isGuessed}
          isPicked={isPicked}
          onPickCard={() => {
            onPickCard(index);
          }}
        />
      ))}
    </div>
  );
};

export default MemoryGame;
