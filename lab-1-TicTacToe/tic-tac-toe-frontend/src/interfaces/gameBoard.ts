import { Game } from "../api/types";

export enum CellState {
  X = "X",
  O = "O",
  Empty = "",
}
export interface Position {
  x: number;
  y: number;
}
export interface CellProps {
  position: Position;
  value: CellState;
}

export interface GameBoardProps {
  game: Game | null;
  onClick: (i: number) => void;
}
