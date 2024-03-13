import { Controller } from '@nestjs/common';
import { MovesService } from './moves.service';

@Controller('move')
export class MovesController {
  constructor(private readonly movesService: MovesService) {}

  // @Post()
  // makeMove(): Promise<MoveDto> {}
}
