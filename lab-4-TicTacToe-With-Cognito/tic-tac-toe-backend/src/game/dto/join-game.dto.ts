import { IsInt, IsNotEmpty } from 'class-validator';
export class JoinGameDto {
  @IsInt()
  gameId: number;
  @IsNotEmpty()
  playerId: string;
}
