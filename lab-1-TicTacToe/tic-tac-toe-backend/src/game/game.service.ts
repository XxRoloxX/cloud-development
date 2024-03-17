import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from 'src/entity/game.entity';
import { Repository } from 'typeorm';
import { CreateGameDTO } from './dto/createGame.dto';
import { GameStatus, PlayerTurn } from 'src/common/game';
import { getRandomName } from 'src/common/randomUtils';
import { MoveDto } from './dto/move.dto';
import { MoveEntity } from 'src/entity/move.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
  ) { }

  findAll(): Promise<GameEntity[]> {
    return this.gameRepository.find({ where: {}, relations: ["moves"] });
  }
  findOne(id: number): Promise<GameEntity> {
    return this.gameRepository.findOne({ where: { id }, relations: ["moves"] });
  }

  private addPlayerToGame(game: GameEntity, playerTurn: PlayerTurn): GameEntity {
    switch (playerTurn) {
      case PlayerTurn.Player1:
        if (game.player1_id) {
          throw new Error(`Game ${game.id} is full`);
        }
        game.player1_id = getRandomName();
        break;
      case PlayerTurn.Player2:
        if (game.player2_id) {
          throw new Error(`Game ${game.id} is full`);
        }
        game.player2_id = getRandomName();
        break;
      default:
        throw new Error(`Invalid playerTurn ${playerTurn}`);
    }


    if (game.player1_id && game.player2_id) {
      game.status = GameStatus.IN_PROGRESS;
    }

    return game;
  }
  async joinGame(id: number, playerTurn: PlayerTurn): Promise<GameEntity> {
    const game = await this.gameRepository.findOneBy({ id });
    if (!game) {
      throw new Error(`Game ${id} not found`);
    }
    if (game.status !== GameStatus.PENDING) {
      throw new Error(`Game ${id} is not pending`);
    }
    return this.gameRepository.save(this.addPlayerToGame(game, playerTurn));

  }
  async makeMove(moveDto: MoveDto) {
    const game = await this.gameRepository.findOneBy({ id: moveDto.gameId });
    if (!game) {
      throw new Error(`Game ${moveDto.gameId} not found`);
    }
    if (game.status !== GameStatus.IN_PROGRESS) {
      throw new Error(`Game ${moveDto.gameId} is not in progress`);
    }
    // if (game.player1_id !== moveDto.playerTurn && game.player2_id !== moveDto.playerTurn) {
    //   throw new Error(`Player ${moveDto.playerTurn} is not in game ${moveDto.gameId}`);
    // }
    if (game.moves && game.moves.length >= 9) {
      throw new Error(`Game ${moveDto.gameId} is full`);
    }
    console.log(moveDto)
    if (!game.moves) {
      game.moves = [];
    }
    const moves = game.moves;
    const move = new MoveEntity();
    move.playerTurn = moveDto.playerTurn;
    move.positionX = moveDto.positionX;
    move.positionY = moveDto.positionY;
    moves.push(move);
    game.moves = moves;
    return this.gameRepository.save(game);


  }

  createGame(): Promise<CreateGameDTO> {
    const gameEntity = new GameEntity();
    return this.gameRepository.save(gameEntity);
  }
}
