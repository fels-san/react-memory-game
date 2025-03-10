import classes from "./GameModal.module.scss";

type GameModalProps = {
  title: string;
  onClose?: () => void;
  children?: React.ReactNode;
};

export default function GameModal({ title, children }: GameModalProps) {
  return (
    <div className={classes["game-modal"]}>
      <h2 className={classes["game-modal__title"]}>{title}</h2>
      <div className={classes["game-modal__buttons"]}>{children}</div>
    </div>
  );
}
