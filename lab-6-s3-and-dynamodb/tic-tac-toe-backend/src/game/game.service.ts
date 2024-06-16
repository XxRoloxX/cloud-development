import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from 'src/entity/game.entity';
import { Repository } from 'typeorm';
import { GameStatus, PlayerTurn } from 'src/common/game';
import { getRandomName } from 'src/common/randomUtils';
import { MoveDto } from './dto/move.dto';
import { MoveEntity } from 'src/entity/move.entity';
import { JoinGameDto } from './dto/join-game.dto';
import { DynamodbService } from 'src/database/dynamodb/dynamodb.service';
import { ResultResponseDto } from '../database/dynamodb/dto/result.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
    private resultStore: DynamodbService
  ) { }

  findAll(): Promise<GameEntity[]> {
    return this.gameRepository.find({ where: {}, relations: ["moves"] });
  }

  findAllPending(): Promise<GameEntity[]> {
    return this.gameRepository.find({ where: { status: GameStatus.PENDING }, relations: ["moves"] });
  }
  findOne(id: string): Promise<GameEntity> {
    // this.resultStore.createResult({
    //   gameId: `mock-game-${Date.now()}`,
    //   player1Id: "player1",
    //   player2Id: "player2",
    //   result: GameStatus.DRAW
    // })
    // this.resultStore.getPreviousResults("player1", "player2")
    return this.gameRepository.findOne({ where: { id }, relations: ["moves"] });
  }

  private checkIfSequenceIsWonByPlayer(game: GameEntity, sequenceCondition: (move: MoveEntity) => boolean) {
    const playersMovesInSequence = game.moves
      .filter(sequenceCondition);


    if (playersMovesInSequence.length !== 3) {
      return null;
    }

    const playersInSequence = playersMovesInSequence
      .reduce((acc, move) => {
        acc.add(move.playerTurn);
        return acc;
      }, new Set());

    if (playersInSequence.size !== 1) {
      return null;
    }

    return playersMovesInSequence[0].playerTurn;
  }

  private isDiagonalWonByPlayer(game: GameEntity): PlayerTurn | null {
    return this.checkIfSequenceIsWonByPlayer(game, (move) => move.positionX === move.positionY);
  }
  private isReverseDiagonalWonByPlayer(game: GameEntity): PlayerTurn | null {
    return this.checkIfSequenceIsWonByPlayer(game, (move) => move.positionX + move.positionY === 2);
  }
  private isColumnWonByPlayer(game: GameEntity): PlayerTurn | null {
    for (const column of Array(3).fill(0).keys()) {
      const columnWinner = this.checkIfSequenceIsWonByPlayer(game, (move) => move.positionY === column);
      if (columnWinner) {
        return columnWinner;
      }
    }
    return null;
  }
  private isRowWonByPlayer(game: GameEntity): PlayerTurn | null {
    for (const row of Array(3).fill(0).keys()) {
      const rowWinner = this.checkIfSequenceIsWonByPlayer(game, (move) => move.positionX === row);
      if (rowWinner) {
        return rowWinner;
      }
    }
    return null;
  }

  public async getPreviousResults(
    player1Id: string,
    player2Id: string
  ): Promise<ResultResponseDto> {
    const samePositionResults =
      await this.resultStore.getPreviousResults(player1Id, player2Id);
    const reversedPositionResults = (await this.resultStore.getPreviousResults(player2Id, player1Id)).map((result) => {
      return {
        ...result,
        player1Id: player2Id,
        player2Id: player1Id,
        result: result.result === GameStatus.PLAYER1_WON ? GameStatus.PLAYER2_WON : result.result === GameStatus.PLAYER2_WON ? GameStatus.PLAYER1_WON : result.result
      }
    })

    return this.resultStore.countResults([...samePositionResults, ...reversedPositionResults]);
  }

  private isGameWonByPlayer(game: GameEntity) {
    return this.isDiagonalWonByPlayer(game)
      || this.isReverseDiagonalWonByPlayer(game)
      || this.isColumnWonByPlayer(game)
      || this.isRowWonByPlayer(game);
  }


  private updateGameStatus(game: GameEntity) {
    switch (game.status) {
      case GameStatus.PENDING:
        if (game.player1_id && game.player2_id) {
          game.status = GameStatus.IN_PROGRESS;
        }
        break;
      case GameStatus.IN_PROGRESS:
        const winner = this.isGameWonByPlayer(game);
        if (winner) {
          game.status = winner === PlayerTurn.Player1 ? GameStatus.PLAYER1_WON : GameStatus.PLAYER2_WON;
          this.resultStore.createResult({
            gameId: game.id,
            player1Id: game.player1_id,
            player2Id: game.player2_id,
            result: game.status
          })
        } else if (game.moves.length === 9) {
          game.status = GameStatus.DRAW;
          this.resultStore.createResult({
            gameId: game.id,
            player1Id: game.player1_id,
            player2Id: game.player2_id,
            result: game.status
          })
        }
        break;
      default:
        break;

    }

  }

  private addPlayerToGame(game: GameEntity, playerTurn: PlayerTurn, playerName?: string): GameEntity {
    switch (playerTurn) {
      case PlayerTurn.Player1:
        if (game.player1_id) {
          throw new Error(`Game ${game.id} is full`);
        }
        game.player1_id = playerName ?? getRandomName();
        break;
      case PlayerTurn.Player2:
        if (game.player2_id) {
          throw new Error(`Game ${game.id} is full`);
        }
        game.player2_id = playerName ?? getRandomName();
        break;
      default:
        throw new Error(`Invalid playerTurn ${playerTurn}`);
    }


    if (game.player1_id && game.player2_id) {
      game.status = GameStatus.IN_PROGRESS;
    }

    return game;
  }
  async joinGame(joinGameDto: JoinGameDto): Promise<GameEntity> {
    const game = await this.gameRepository.findOneBy({ id: joinGameDto.gameId });
    if (!game) {
      throw new Error(`Game ${joinGameDto.gameId} not found`);
    }
    if (game.status !== GameStatus.PENDING) {
      throw new Error(`Game ${joinGameDto.gameId} is not pending`);
    }


    const modifiedGame = this.addPlayerToGame(game, joinGameDto.playerTurn, joinGameDto.playerId)
    const result = await this.gameRepository.save(modifiedGame);
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

  getPlayersTurn(game: GameEntity, playerId: string): PlayerTurn {
    if (game.player1_id === playerId) {
      return PlayerTurn.Player1;
    } else if (game.player2_id === playerId) {
      return PlayerTurn.Player2;
    } else {
      throw new Error(`Player ${playerId} is not in game ${game.id}`);
    }
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
    if (this.getPlayersTurn(game, moveDto.playerId) !== moveDto.playerTurn) {
      throw new Error(`Player ${moveDto.playerId} is not player ${moveDto.playerTurn}`);
    }

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
    this.updateGameStatus(game);
    this.changeTurn(game);

    return this.gameRepository.save(game);
  }


  async createGame(): Promise<GameEntity> {
    const gameEntity = new GameEntity();
    const result = await this.gameRepository.save(gameEntity);
    return result;
  }
}
