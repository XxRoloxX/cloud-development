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
    const res = this.gameService.findOne(params.id);
    return res;
  }
  @Get('/results/:player1Id/:player2Id')
  getResults(@Param() params: { player1Id: string, player2Id: string }): Promise<any> {
    return this.gameService.getPreviousResults(params.player1Id, params.player2Id);
  }
}
