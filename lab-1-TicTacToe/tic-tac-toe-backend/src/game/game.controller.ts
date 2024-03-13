import { Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDTO } from './dto/createGame.dto';
import { GameDto } from './dto/game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  findAll(): Promise<GameDto[]> {
    return this.gameService.findAll();
  }

  @Post()
  createGame(): Promise<CreateGameDTO> {
    return this.gameService.createGame();
  }

  // @Patch()
  // joinGame(): Promise<GameEntity> {}
}
