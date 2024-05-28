export enum GameStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  PLAYER1_WON = "PLAYER1_WON",
  PLAYER2_WON = "PLAYER2_WON",
  DRAW = "DRAW",
}

export enum PlayerTurn {
  Player1 = "Player1",
  Player2 = "Player2",
}

export interface Position {
  x: number;
  y: number;
}

export interface Move {
  playerTurn: PlayerTurn;
  position: Position;
}

export interface MoveDto {
  gameId: number;
  playerTurn: PlayerTurn;
  playerId: string;
  positionX: number;
  positionY: number;
}

export interface Game {
  id: number;

  status: GameStatus;

  player1_id: string | null;

  player2_id: string | null;

  currentTurn: PlayerTurn;

  moves: MoveDto[];
}
