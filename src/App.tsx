import { useGameStore } from "./store";

import WelcomeScreen from "./components/WelcomeScreen";
import MenuScreen from "./components/MenuScreen";
import GameScreen from "./components/GameScreen";

function App() {
  const gameStatus = useGameStore((state) => state.gameStatus);

  if (gameStatus === "welcomeScreen") {
    return <WelcomeScreen />;
  }

  if (gameStatus === "menuScreen") {
    return <MenuScreen />;
  }

  return <GameScreen />;
}

export default App;
