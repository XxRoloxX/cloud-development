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
export interface CellProps extends React.HTMLProps<HTMLButtonElement> {
  position: Position;
  value: CellState;
  defaultStyle?: string;
}

export interface GameBoardProps {
  game: Game | null;
  onClick: (i: number) => void;
}
