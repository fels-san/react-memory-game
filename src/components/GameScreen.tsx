import { useGameStore } from "../store";

import GameModal from "../ui/GameModal";
import GameBoard from "./GameBoard";
import GameStatus from "./GameStatus";

import pinkFlower from "../assets/images/pink_flower.png";

import classes from "./GameScreen.module.scss";

export default function GameScreen() {
  const gameStatus = useGameStore((state) => state.gameStatus);
  const restartGame = useGameStore((state) => state.restartGame);
  const togglePause = useGameStore((state) => state.togglePause);
  const setGameStatus = useGameStore((state) => state.setGameStatus);

  function handleHomeClick() {
    setGameStatus("welcomeScreen");
  }

  return (
    <div className={classes["memory-game"]}>
      <img
        className={`${classes["memory-game__flower"]} ${classes["memory-game__flower--pink"]}`}
        src={pinkFlower}
        alt="pink flower"
      />
      <GameStatus />
      <GameBoard />
      {gameStatus === "gameOver" && (
        <GameModal title="Вы выиграли!">
          <button
            className={classes["game-modal__button"]}
            onClick={restartGame}
          >
            Начать заново
          </button>
          <button
            className={classes["game-modal__button"]}
            onClick={handleHomeClick}
          >
            Меню
          </button>
        </GameModal>
      )}
      {gameStatus === "paused" && (
        <GameModal title="Пауза">
          <button
            className={classes["game-modal__button"]}
            onClick={restartGame}
          >
            Начать заново
          </button>
          <button
            className={classes["game-modal__button"]}
            onClick={togglePause}
          >
            Продолжить
          </button>
          <button
            className={classes["game-modal__button"]}
            onClick={handleHomeClick}
          >
            Меню
          </button>
        </GameModal>
      )}
    </div>
  );
}
