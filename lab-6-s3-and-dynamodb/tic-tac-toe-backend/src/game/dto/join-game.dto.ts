import { IsInt, IsNotEmpty } from 'class-validator';
import { PlayerTurn } from 'src/common/game';
export class JoinGameDto {
  gameId: string;
  @IsNotEmpty()
  playerId: string;
  @IsNotEmpty()
  playerName: string;
  @IsNotEmpty()
  playerPicture: string;
  playerTurn: PlayerTurn;
}
