import s from "./App.module.scss";
import MemoryGame from "./components/MemoryGame";
import Container from "./components/Container";

function App() {
  return (
    <div className={s.app}>
      <Container className={s.container}>
        <MemoryGame />
      </Container>
    </div>
  );
}

export default App;
