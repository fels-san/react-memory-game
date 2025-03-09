import { useEffect, useState } from "react";
import { generateCards } from "../utils/utils";
import { CardType } from "../types/types";

export function useMemoryGame(images: string[]) {
  const [cards, setCards] = useState<CardType[]>(generateCards(images));
  const [activeCard, setActiveCard] = useState<CardType | null>(null);
  const [awaitingEndOfMove, setAwaitingEndOfMove] = useState(false);
  const [flippedCardsCount, setFlippedCardsCount] = useState(0);
  const [movesCounter, setMovesCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const gameOver = flippedCardsCount === cards.length;

  useEffect(() => {
    if (gameOver || isPaused) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver, isPaused]);

  function handleSelectCard(id: number) {
    const selectedCard = cards.find((card) => card.id === id);

    if (
      gameOver ||
      !selectedCard ||
      awaitingEndOfMove ||
      selectedCard.isFlipped ||
      selectedCard === activeCard
    ) {
      return;
    }

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === selectedCard.id ? { ...card, isFlipped: true } : card
      )
    );

    if (!activeCard) {
      setActiveCard(selectedCard);
      return;
    }

    setMovesCounter((prevCounter) => prevCounter + 1);

    if (selectedCard.image === activeCard.image) {
      setActiveCard(null);
      setFlippedCardsCount((prev) => prev + 2);
    } else {
      setAwaitingEndOfMove(true);
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === activeCard.id || card.id === selectedCard.id
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setActiveCard(null);
        setAwaitingEndOfMove(false);
      }, 1000);
    }
  }

  function handleHintClick() {
    if (awaitingEndOfMove || gameOver || isPaused) return;

    const closedCards = cards.filter((card) => !card.isFlipped);
    if (closedCards.length === 0) return;

    const randomCard =
      closedCards[Math.floor(Math.random() * closedCards.length)];

    setAwaitingEndOfMove(true);
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === randomCard.id ? { ...card, isFlipped: true } : card
      )
    );

    setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === randomCard.id ? { ...card, isFlipped: false } : card
        )
      );
      setAwaitingEndOfMove(false);
    }, 3000);
  }

  function handlePauseToggle() {
    setIsPaused((prev) => !prev);
  }

  function handleRestart() {
    setCards(generateCards(images));
    setTimer(0);
    setMovesCounter(0);
    setFlippedCardsCount(0);
    setIsPaused(false);
  }

  return {
    cards,
    timer,
    movesCounter,
    gameOver,
    isPaused,
    handleSelectCard,
    handleHintClick,
    handlePauseToggle,
    handleRestart,
  };
}
