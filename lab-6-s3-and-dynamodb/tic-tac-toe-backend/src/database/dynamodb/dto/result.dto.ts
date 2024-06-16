import { GameStatus } from "src/common/game";

export class Result {
  gameId: string;
  player1Id: string;
  player2Id: string;
  result: GameStatus;
}
export class ResultResponseDto {
  player1Wins: number;
  player2Wins: number;
}
