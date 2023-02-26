import "./App.scss";
import MemoryGame from "./components/MemoryGame";
import Container from "./components/Container";

function App() {
  return (
    <div className="App">
      <Container>
        <MemoryGame />
      </Container>
    </div>
  );
}

export default App;
