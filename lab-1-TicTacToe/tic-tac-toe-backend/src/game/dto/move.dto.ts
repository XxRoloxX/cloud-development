import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Move } from 'src/common/game';

export class MoveDto {
  gameId: string;
  playerId: string;
  @Type(() => Move)
  @ValidateNested()
  move: Move;
}
