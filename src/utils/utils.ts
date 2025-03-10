import { CardType, Difficulty } from "../types/types";

export function shuffleArray(array: CardType[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateCards(images: string[]) {
  const duplicatedImages = images.flatMap((image, index) => [
    { id: index * 2, image, isFlipped: false },
    { id: index * 2 + 1, image, isFlipped: false },
  ]);
  return shuffleArray(duplicatedImages);
}

export const getCardSize = (difficulty: Difficulty["level"]) => {
  switch (difficulty) {
    case "easy":
      return "large";
    case "medium":
      return "medium";
    case "hard":
      return "small";
    default:
      return "medium";
  }
};

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}:${remainingSeconds}`;
}
