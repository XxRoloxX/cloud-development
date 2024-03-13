import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from 'src/entity/game.entity';
import { Repository } from 'typeorm';
import { CreateGameDTO } from './dto/createGame.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
  ) {}

  findAll(): Promise<GameEntity[]> {
    return this.gameRepository.find();
  }

  createGame(): Promise<CreateGameDTO> {
    const gameEntity = new GameEntity();
    return this.gameRepository.save(gameEntity);
  }
}
