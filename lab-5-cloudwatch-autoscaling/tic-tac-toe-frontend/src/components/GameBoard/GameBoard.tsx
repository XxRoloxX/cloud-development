import "./GameBoard.style.scss";
import useGameBoard from "./useGameBoard";
import { CellProps, GameBoardProps } from "../../interfaces/gameBoard";
import GameCell from "./GameCell";

const GameBoard = (props: GameBoardProps) => {
  const { cells, style } = useGameBoard(props);
  console.log(cells);

  return (
    <div className="game">
      <div className="game__board">
        {cells.map((cell: CellProps, index: number) => (
          <GameCell
            key={index}
            {...cell}
            defaultStyle={style}
            onClick={() => props.onClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
