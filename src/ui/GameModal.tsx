type GameModalProps = {
  title: string;
  onClose?: () => void;
  children?: React.ReactNode;
};

export default function GameModal({
  title,
//   onClose,
  children,
}: GameModalProps) {
  return (
    <div className="game-modal">
      <h2 className="game-modal__title">{title}</h2>
      <div className="game-modal__buttons">{children}</div>
      {/* {onClose && <button onClick={onClose}>Close</button>} */}
    </div>
  );
}
