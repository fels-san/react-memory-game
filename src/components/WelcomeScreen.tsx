import { useGameStore } from "../store";

import classes from "./WelcomeScreen.module.scss";

export default function WelcomeScreen() {
  const setGameStatus = useGameStore((state) => state.setGameStatus);

  function handleStartClick() {
    setGameStatus("menuScreen");
  }

  return (
    <div className={classes["welcome-screen"]}>
      <h1 className={classes["welcome-screen__title"]}>Memory Game</h1>
      <button
        className={classes["welcome-screen__start-button"]}
        onClick={handleStartClick}
      >
        НАЧАТЬ ИГРУ
      </button>
    </div>
  );
}
