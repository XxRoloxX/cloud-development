import { Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDTO } from './dto/createGame.dto';
import { GameDto } from './dto/game.dto';
import { Param } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { MoveDto } from './dto/move.dto';
import { Body } from '@nestjs/common';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) { }

  @Get()
  findAll(): Promise<GameDto[]> {
    return this.gameService.findAll();
  }

  @Post()
  createGame(): Promise<CreateGameDTO> {
    return this.gameService.createGame();
  }

  @Get(':id')
  findOne(@Param() params: any): Promise<GameDto> {
    this.gameService.findOne(params.id).then((game) => {
      console.log("game: ", game)

    })
    return this.gameService.findOne(params.id);
  }

  @Patch(':id/join')
  async joinGame(@Param() params: any, @Body() body): Promise<GameDto> {
    try {
      return await this.gameService.joinGame(body.id, body.playerTurn);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
  @Patch(':id/move')
  async makeMove(@Param() params: any, @Body() moveDto: MoveDto): Promise<GameDto> {
    try {
      return await this.gameService.makeMove(moveDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
