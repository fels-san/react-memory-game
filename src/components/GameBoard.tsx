import { useGameStore } from "../store";

import classes from "./GameBoard.module.scss";

import Card from "./Card";

export default function GameBoard() {
  const cards = useGameStore((state) => state.cards);

  return (
    <section className={classes["game-board"]}>
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </section>
  );
}
