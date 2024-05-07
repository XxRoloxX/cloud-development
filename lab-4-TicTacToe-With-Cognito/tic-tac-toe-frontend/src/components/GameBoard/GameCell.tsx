import { useEffect, useState } from "react";
import { CellProps } from "../../interfaces/gameBoard";

const GameCell = (props: CellProps) => {
  const [previousState, setPreviousState] = useState(props.value);

  const wasCellEmpty = () => previousState === "";
  const isCellEmpty = () => props.value === "";
  const getSelectionStyle = () => {
    console.log("wasCellEmpty", wasCellEmpty());
    return !isCellEmpty() ? "game__cell--selected" : "game__cell";
  };
  const getPlayerStyle = () => {
    return props.value === "X"
      ? "game__cell--player1"
      : props.value === "O"
        ? "game__cell--player2"
        : "game__cell--empty";
  };

  const getFullCellStyle = () => {
    return (
      getSelectionStyle() +
      " " +
      getPlayerStyle() +
      " " +
      (isCellEmpty() ? props.defaultStyle : "")
    );
  };

  useEffect(() => {
    if (previousState !== props.value) {
      setPreviousState(props.value);
    }
  }, [props.value]);

  return (
    <button className={getFullCellStyle()} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default GameCell;
