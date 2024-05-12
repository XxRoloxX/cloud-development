import { IsEnum, IsInt, ValidateNested } from 'class-validator';
import { Max, Min } from 'class-validator';
import { PlayerTurn } from 'src/common/game';

export class MoveDto {

  gameId: string;
  playerId: string;
  @IsEnum(PlayerTurn)
  playerTurn: PlayerTurn;
  // @IsInt()
  // @Min(0)
  // @Max(2)
  positionX: number;

  // @IsInt()
  // @Min(0)
  // @Max(2)
  positionY: number;
  // @Type(() => Move)
  // @ValidateNested()
  // move: Move;
}
