import { Type } from 'class-transformer';
import { IsNumber, Max, Min, ValidateNested } from 'class-validator';

export enum GameStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  PLAYER1_WON = 'PLAYER1_WON',
  PLAYER2_WON = 'PLAYER2_WON',
  DRAW = 'DRAW',
}

export enum PlayerTurn {
  Player1 = 'Player1',
  Player2 = 'Player2',
}

export class Position {
  @IsNumber()
  @Min(0)
  @Max(2)
  x: number;
  @IsNumber()
  @Min(0)
  @Max(2)
  y: number;
}

export class Move {
  playerId: string;
  @Type(() => Position)
  @ValidateNested()
  position: Position;
}
