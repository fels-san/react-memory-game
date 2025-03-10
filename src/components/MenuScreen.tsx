import { useGameStore } from "../store";
import { Difficulty } from "../types/types";

import classes from "./MenuScreen.module.scss";

export default function MenuScreen() {
  const startGame = useGameStore((state) => state.startGame);

  function handleDifficultySelect(
    level: Difficulty["level"],
    cardCount: number
  ) {
    startGame({ level, cardCount });
  }

  return (
    <div className={classes["menu-screen"]}>
      <h2 className={classes["menu-screen__title"]}>Выберите сложность</h2>
      <button
        className={classes["menu-screen__button"]}
        onClick={() => handleDifficultySelect("easy", 12)}
      >
        Простая (12 карт)
      </button>
      <button
        className={classes["menu-screen__button"]}
        onClick={() => handleDifficultySelect("medium", 20)}
      >
        Средняя (20 карт)
      </button>
      <button
        className={classes["menu-screen__button"]}
        onClick={() => handleDifficultySelect("hard", 30)}
      >
        Сложная (30 карт)
      </button>
    </div>
  );
}
