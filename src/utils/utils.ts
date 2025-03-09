import { CardType } from "../types/types";

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
