import { create } from "zustand";
import { generateCards } from "./utils/utils";
import { CardType, Difficulty } from "./types/types";
import GameStatus from "./components/GameStatus";

import hedgehog from "./assets/images/hedgehog_icon.png";
import kitten from "./assets/images/cat_icon.png";
import puppy from "./assets/images/dog_icon.png";
import pig from "./assets/images/pig_icon.png";
import sheep from "./assets/images/sheep_icon.png";
import axolotl from "./assets/images/axolotl_icon.png";
import cow from "./assets/images/cow_icon.png";
import lion from "./assets/images/lion_icon.png";
import monkey from "./assets/images/monkey_icon.png";
import panda from "./assets/images/panda_icon.png";
import bunny from "./assets/images/rabbit_icon.png";
import bear from "./assets/images/bear_icon.png";
import frog from "./assets/images/frog_icon.png";
import chipmunk from "./assets/images/hamster_icon.png";
import chick from "./assets/images/chicken_icon.png";

const images = [
  hedgehog,
  kitten,
  puppy,
  pig,
  sheep,
  axolotl,
  cow,
  lion,
  monkey,
  panda,
  bunny,
  bear,
  frog,
  chipmunk,
  chick,
];

const initialCards = generateCards(images);

type GameStatus =
  | "welcomeScreen"
  | "menuScreen"
  | "playing"
  | "paused"
  | "gameOver";

interface GameState {
  cards: CardType[];
  activeCard: CardType | null;
  awaitingEndOfMove: boolean;
  flippedCardsCounter: number;
  movesCounter: number;
  timer: number;
  difficulty: Difficulty;
  gameStatus: GameStatus;
  flipCard: (cardId: CardType["id"]) => void;
  setActiveCard: (card: CardType | null) => void;
  setAwaitingEndOfMove: (value: boolean) => void;
  setGameStatus: (status: GameStatus) => void;
  increaseMovesCounter: () => void;
  increaseFlippedCardsCounter: () => void;
  incrementTimer: () => void;
  togglePause: () => void;
  startGame: (difficulty: Difficulty) => void;
  restartGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  cards: initialCards,
  activeCard: null,
  awaitingEndOfMove: false,
  flippedCardsCounter: 0,
  movesCounter: 0,
  timer: 0,
  difficulty: { level: "medium", cardCount: 20 },
  gameStatus: "welcomeScreen",

  flipCard: (cardId: CardType["id"]) =>
    set({
      cards: get().cards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: !card.isFlipped } : card
      ),
    }),

  setActiveCard: (card: CardType | null) => set({ activeCard: card }),

  setAwaitingEndOfMove: (value: boolean) => set({ awaitingEndOfMove: value }),

  setGameStatus: (status: GameStatus) => set({ gameStatus: status }),

  increaseMovesCounter: () => set({ movesCounter: get().movesCounter + 1 }),

  increaseFlippedCardsCounter: () => {
    if (get().flippedCardsCounter + 2 === get().difficulty.cardCount) {
      set({
        flippedCardsCounter: get().flippedCardsCounter + 2,
        gameStatus: "gameOver",
      });
    } else {
      set({ flippedCardsCounter: get().flippedCardsCounter + 2 });
    }
  },

  incrementTimer: () => set({ timer: get().timer + 1 }),

  togglePause: () =>
    set({ gameStatus: get().gameStatus === "playing" ? "paused" : "playing" }),

  startGame: (difficulty: Difficulty) =>
    set({
      cards: generateCards(images.slice(0, difficulty.cardCount / 2)),
      gameStatus: "playing",
      difficulty,
      timer: 0,
      movesCounter: 0,
      flippedCardsCounter: 0,
      activeCard: null,
      awaitingEndOfMove: false,
    }),

  restartGame: () =>
    set({
      cards: generateCards(images.slice(0, get().difficulty.cardCount / 2)),
      gameStatus: "playing",
      timer: 0,
      movesCounter: 0,
      flippedCardsCounter: 0,
      activeCard: null,
      awaitingEndOfMove: false,
    }),
}));
