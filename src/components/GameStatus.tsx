import { useEffect, useRef } from "react";
import { useGameStore } from "../store";

import GlassIcon from "../ui/icons/GlassIcon";
import PauseIcon from "../ui/icons/PauseIcon";

import classes from "./GameStatus.module.scss";

import { formatTime } from "../utils/utils";

export default function GameStatus() {
  const gameStatus = useGameStore((state) => state.gameStatus);
  const incrementTimer = useGameStore((state) => state.incrementTimer);
  const cards = useGameStore((state) => state.cards);
  const movesCounter = useGameStore((state) => state.movesCounter);
  const timer = useGameStore((state) => state.timer);
  const flipCard = useGameStore((state) => state.flipCard);
  const togglePause = useGameStore((state) => state.togglePause);
  const setAwaitingEndOfMove = useGameStore(
    (state) => state.setAwaitingEndOfMove
  );

  const intervalRef = useRef<number>(null);

  useEffect(() => {
    if (gameStatus !== "playing") return;

    intervalRef.current = setInterval(() => {
      incrementTimer();
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gameStatus, incrementTimer]);

  function handleShowHint() {
    const closedCards = cards.filter((card) => !card.isFlipped);
    const randomCard =
      closedCards[Math.floor(Math.random() * closedCards.length)];

    setAwaitingEndOfMove(true);
    flipCard(randomCard.id);

    setTimeout(() => {
      flipCard(randomCard.id);
      setAwaitingEndOfMove(false);
    }, 1000);
  }

  function handlePauseToggle() {
    togglePause();
  }

  return (
    <header className={classes["game-status"]}>
      <div className={classes["game-status__buttons"]}>
        <button
          className={classes["game-status__button"]}
          onClick={handlePauseToggle}
        >
          <PauseIcon className={classes["game-status__icon"]} />
        </button>
        <button
          className={classes["game-status__button"]}
          onClick={handleShowHint}
        >
          <GlassIcon className={classes["game-status__icon"]} />
        </button>
      </div>
      <p className={classes["game-status__score"]}>Ходы: {movesCounter}</p>
      <p className={classes["game-status__timer"]}>
        Время: {formatTime(timer)}
      </p>
    </header>
  );
}
