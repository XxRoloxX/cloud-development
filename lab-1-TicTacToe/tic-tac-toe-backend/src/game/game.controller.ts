import { Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDTO } from './dto/createGame.dto';
import { GameDto } from './dto/game.dto';
import { Param } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { EventsGateway } from './game.socket';

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
    this.gameService.findOne(params.id).then((game) => {
      // console.log("game: ", game)

    })
    return this.gameService.findOne(params.id);
  }

  @Patch(':id/join')
  async joinGame(@Param() params: any, @Body() body): Promise<GameDto> {
    try {
      const result = await this.gameService.joinGame(body.id, body.playerTurn);
      this.eventsGateway.announceJoinGame(result);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
