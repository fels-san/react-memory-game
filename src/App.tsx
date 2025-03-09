import hedgehog from "./assets/images/hedgehog_icon.png";
import kitten from "./assets/images/cat_icon.png";
import puppy from "./assets/images/dog_icon.png";
import chick from "./assets/images/chicken_icon.png";
import chipmunk from "./assets/images/hamster_icon.png";
import bunny from "./assets/images/rabbit_icon.png";
import bear from "./assets/images/bear_icon.png";
import frog from "./assets/images/frog_icon.png";
import pig from "./assets/images/pig_icon.png";
import sheep from "./assets/images/sheep_icon.png";

import pinkFlower from "./assets/images/pink_flower.png";
// import verticalPinkFlower from "./assets/images/vertical_pink_flower.png";
// import whiteFlower from "./assets/images/white_flower.png";

import GameBoard from "./components/GameBoard";
import GameStatus from "./components/GameStatus";
import { useMemoryGame } from "./hooks/useMemoryGame";
import GameModal from "./ui/GameModal";

function App() {
  const images = [
    hedgehog,
    kitten,
    puppy,
    chick,
    chipmunk,
    bunny,
    bear,
    frog,
    pig,
    sheep,
  ];

  const {
    cards,
    timer,
    movesCounter,
    gameOver,
    isPaused,
    handleSelectCard,
    handleHintClick,
    handlePauseToggle,
    handleRestart,
  } = useMemoryGame(images);

  return (
    <div className="memory-game">
      <img
        className="flowers__pink-flower"
        src={pinkFlower}
        alt="pink flower"
      />
      <GameStatus
        timer={timer}
        movesCounter={movesCounter}
        onHintClick={handleHintClick}
        onPauseClick={handlePauseToggle}
      />
      <GameBoard cards={cards} onSelectCard={handleSelectCard} />
      {gameOver && (
        <GameModal title="Game Over!">
          <button className="game-modal__button" onClick={handleRestart}>
            Restart
          </button>
        </GameModal>
      )}
      {isPaused && (
        <GameModal title="Game Paused">
          <button className="game-modal__button" onClick={handleRestart}>
            Restart
          </button>
          <button className="game-modal__button" onClick={handlePauseToggle}>
            Continue
          </button>
        </GameModal>
      )}
    </div>
  );
}

export default App;
