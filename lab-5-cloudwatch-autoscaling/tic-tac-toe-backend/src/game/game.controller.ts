import { Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDTO } from './dto/createGame.dto';
import { GameDto } from './dto/game.dto';
import { Param } from '@nestjs/common';
import { EventsGateway } from './game.socket';
import { UseGuards } from '@nestjs/common';
import { HttpGuard } from 'src/auth/guards/http.guard';

@UseGuards(HttpGuard)
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService, private readonly eventsGateway: EventsGateway) { }

  @Get()
  findAll(): Promise<GameDto[]> {
    return this.gameService.findAllPending();
  }

  @Post()
  async createGame(): Promise<CreateGameDTO> {
    const new_game = await this.gameService.createGame();
    this.eventsGateway.announceNewGame(new_game);
    return new_game;
  }

  @Get(':id')
  findOne(@Param() params: any): Promise<GameDto> {
    return this.gameService.findOne(params.id);
  }
}
