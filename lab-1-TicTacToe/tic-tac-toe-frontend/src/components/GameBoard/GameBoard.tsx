import "./GameBoard.style.scss";
import useGameBoard from "./useGameBoard";
import { CellProps, GameBoardProps } from "../../interfaces/gameBoard";

const GameBoard = (props: GameBoardProps) => {
  const { cells } = useGameBoard(props);
  console.log(cells);

  return (
    <div className="game">
      <div className="game__board">
        {cells.map((cell: CellProps, index: number) => {
          return (
            <button
              className="game__cell"
              key={index}
              onClick={() => props.onClick(index)}
            >
              {cell.value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;
