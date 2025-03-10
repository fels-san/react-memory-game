export type CardType = {
  id: number;
  image: string;
  isFlipped: boolean;
};

export type Difficulty = {
  level: "easy" | "medium" | "hard";
  cardCount: number;
};
