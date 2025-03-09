import star from "../assets/images/star_icon.png";
import { CardType } from "../types/types";

export default function Card({
  card,
  onClick,
}: {
  card: CardType;
  onClick: (id: number) => void;
}) {
  return (
    <button
      className={`card ${card.isFlipped ? "flipped" : ""}`}
      onClick={() => onClick(card.id)}
    >
      {/* <div>{card.image.split('/').pop()?.split('.')[0]}</div> */}
      <span className="card__content">
        <img
          className="card__content__img"
          src={card.isFlipped ? card.image : star}
          alt=""
        />
      </span>
    </button>
  );
}
