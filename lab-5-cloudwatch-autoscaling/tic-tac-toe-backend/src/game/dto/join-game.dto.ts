import { IsInt, IsNotEmpty } from 'class-validator';
import { PlayerTurn } from 'src/common/game';
export class JoinGameDto {
  gameId: string;
  @IsNotEmpty()
  playerId: string;
  playerTurn: PlayerTurn;
}
