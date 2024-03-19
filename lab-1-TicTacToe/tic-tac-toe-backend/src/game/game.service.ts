import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from 'src/entity/game.entity';
import { Repository } from 'typeorm';
import { CreateGameDTO } from './dto/createGame.dto';
import { GameStatus, PlayerTurn } from 'src/common/game';
import { getRandomName } from 'src/common/randomUtils';
import { MoveDto } from './dto/move.dto';
import { MoveEntity } from 'src/entity/move.entity';
import { EventsGateway } from './game.socket';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
  ) { }

  findAll(): Promise<GameEntity[]> {
    return this.gameRepository.find({ where: {}, relations: ["moves"] });
  }

  findAllPending(): Promise<GameEntity[]> {
    return this.gameRepository.find({ where: { status: GameStatus.PENDING }, relations: ["moves"] });
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
    const result = await this.gameRepository.save(this.addPlayerToGame(game, playerTurn));
    return result;

  }

  isFieldAlreadyTaken(game: GameEntity, positionX: number, positionY: number): boolean {
    if (!game.moves) {
      return false;
    }
    return game.moves.some((move) => move.positionX === positionX && move.positionY === positionY);
  }

  changeTurn(game: GameEntity) {
    if (game.currentTurn === PlayerTurn.Player1) {
      game.currentTurn = PlayerTurn.Player2;
    } else {
      game.currentTurn = PlayerTurn.Player1;
    }
    return game;
  }

  async makeMove(moveDto: MoveDto) {
    const game = await this.gameRepository.findOne({ where: { id: moveDto.gameId }, relations: ["moves"] });
    if (!game) {
      throw new Error(`Game ${moveDto.gameId} not found`);
    }
    if (game.status !== GameStatus.IN_PROGRESS) {
      throw new Error(`Game ${moveDto.gameId} is not in progress`);
    }
    if (this.isFieldAlreadyTaken(game, moveDto.positionX, moveDto.positionY)) {
      throw new Error(`Field ${moveDto.positionX}, ${moveDto.positionY} is already taken`);
    }
    if (game.currentTurn !== moveDto.playerTurn) {
      throw new Error(`It's not player ${moveDto.playerTurn} turn`);
    }

    if (game.moves && game.moves.length >= 9) {
      throw new Error(`Game ${moveDto.gameId} is full`);
    }
    console.log(moveDto)
    console.log(game.moves)
    if (!game.moves) {
      game.moves = [];
      console.log("First move")
    }
    const moves = game.moves;
    const move = new MoveEntity();
    move.playerTurn = moveDto.playerTurn;
    move.positionX = moveDto.positionX;
    move.positionY = moveDto.positionY;
    moves.push(move);
    game.moves = moves;
    this.changeTurn(game);
    return this.gameRepository.save(game);


  }

  async createGame(): Promise<GameEntity> {
    const gameEntity = new GameEntity();
    const result = await this.gameRepository.save(gameEntity);
    // this.gameSocket.announceNewGame(result);
    return result;
  }
}
