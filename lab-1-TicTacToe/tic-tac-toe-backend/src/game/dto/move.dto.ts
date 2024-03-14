import { IsInt, ValidateNested } from 'class-validator';
import { Max, Min } from 'class-validator';

export class MoveDto {

  gameId: number;
  playerId: string;

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
