import "./App.scss";
import MemoryGame from "./components/MemoryGame";
import Container from "./components/Container";

function App() {
  return (
    <div className="App">
      <Container>
        <h1>Memory Game</h1>
        <MemoryGame />
      </Container>
    </div>
  );
}

export default App;
