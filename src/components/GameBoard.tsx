import { CardType } from "../types/types";
import Card from "./Card";

export default function GameBoard({
  cards,
  onSelectCard,
}: {
  cards: CardType[];
  onSelectCard: (cardId: number) => void;
}) {
  return (
    <section className="game-board">
      {cards.map((card, index) => (
        <Card key={index} card={card} onClick={onSelectCard} />
      ))}
    </section>
  );
}
