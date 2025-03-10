import { useGameStore } from "../store";

import star from "../assets/images/star_icon.png";

import { CardType } from "../types/types";
import { getCardSize } from "../utils/utils";

import classes from "./Card.module.scss";

type CardProps = {
  card: CardType;
};

export default function Card({ card }: CardProps) {
  const gameStatus = useGameStore((state) => state.gameStatus);
  const awaitingEndOfMove = useGameStore((state) => state.awaitingEndOfMove);
  const activeCard = useGameStore((state) => state.activeCard);
  const difficulty = useGameStore((state) => state.difficulty);
  const flipCard = useGameStore((state) => state.flipCard);
  const setActiveCard = useGameStore((state) => state.setActiveCard);
  const increaseFlippedCardsCounter = useGameStore(
    (state) => state.increaseFlippedCardsCounter
  );
  const setAwaitingEndOfMove = useGameStore(
    (state) => state.setAwaitingEndOfMove
  );
  const increaseMovesCounter = useGameStore(
    (state) => state.increaseMovesCounter
  );

  const cardSize = getCardSize(difficulty.level);

  function handleSelectCard() {
    if (
      gameStatus === "gameOver" ||
      awaitingEndOfMove ||
      card.isFlipped ||
      card === activeCard
    )
      return;

    flipCard(card.id);

    if (!activeCard) {
      setActiveCard(card);
      return;
    }

    if (card.image === activeCard.image) {
      increaseFlippedCardsCounter();
    } else {
      setAwaitingEndOfMove(true);

      setTimeout(() => {
        flipCard(card.id);
        flipCard(activeCard.id);
        setAwaitingEndOfMove(false);
      }, 1000);
    }

    setActiveCard(null);
    increaseMovesCounter();
  }

  return (
    <button
      className={`${classes["card"]} ${classes["card--flipped"]} ${
        classes[`card--${cardSize}`]
      }`}
      onClick={handleSelectCard}
    >
      <span className={classes["card__content"]}>
        <img
          className={classes["card__content__img"]}
          src={card.isFlipped ? card.image : star}
          alt="card image"
        />
      </span>
    </button>
  );
}
