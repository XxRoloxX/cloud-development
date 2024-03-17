import { useEffect, useState } from "react";
import {
  CellProps,
  CellState,
  GameBoardProps,
} from "../../interfaces/gameBoard";
import { Move } from "../../api/types";

const createEmptyBoard = (): CellProps[] => {
  return Array(9)
    .fill(null)
    .map((_, i) => {
      return {
        position: {
          x: i % 3,
          y: Math.floor(i / 3),
        },
        value: CellState.Empty,
      };
    });
};

const fillBoard = (moves: Move[]): CellProps[] => {
  const fullBoard = createEmptyBoard();
  if (moves.length === 0) return fullBoard;
  console.log("Board", fullBoard);
  moves.forEach((move) => {
    fullBoard.find((cell: CellProps) => {
      if (
        cell.position.x === move.position.x &&
        cell.position.y === move.position.y
      ) {
        cell.value = move.playerTurn === "Player1" ? CellState.X : CellState.O;
        return true;
      }
      return false;
    });
  });
  return fullBoard;
};

const sortCellsByPosition = (squareProps: CellProps[]) => {
  return [...squareProps].sort((squareA: CellProps, squareB: CellProps) => {
    if (squareA.position.x === squareB.position.x) {
      return squareA.position.y - squareB.position.y;
    }
    return squareA.position.x - squareB.position.x;
  });
};

const useGameBoard = (props: GameBoardProps) => {
  const [cells, setCells] = useState<CellProps[]>([]);
  // console.log(props.game);
  useEffect(() => {
    if (props.game == null) return;
    const fullBoard = sortCellsByPosition(fillBoard(props.game.moves));
    setCells(fullBoard);
  }, [props.game]);

  return { cells };
};

export default useGameBoard;
