import GlassIcon from "../ui/icons/GlassIcon";
import PauseIcon from "../ui/icons/PauseIcon";

export default function GameStatus({
  timer,
  movesCounter,
  onHintClick,
  onPauseClick,
}: {
  timer: number;
  movesCounter: number;
  onHintClick: () => void;
  onPauseClick: () => void;
}) {
  function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

    return `${hours}:${minutes}:${remainingSeconds}`;
  }

  return (
    <header className="game-status">
      <div className="buttons">
        <button onClick={onPauseClick}>
          <PauseIcon />
        </button>
        <button onClick={onHintClick}>
          <GlassIcon />
        </button>
      </div>
      <p className="game-status__score">Ходы: {movesCounter}</p>
      <p className="game-status__timer">Время: {formatTime(timer)}</p>
    </header>
  );
}
