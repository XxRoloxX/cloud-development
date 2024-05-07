import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { MovesModule } from './moves/moves.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from 'src/entity/game.entity';
import { GameController } from './game.controller';
import { MoveEntity } from 'src/entity/move.entity';
import { EventsGateway } from './game.socket';

@Module({
  controllers: [GameController],
  providers: [EventsGateway, GameService,],
  imports: [MovesModule, TypeOrmModule.forFeature([GameEntity, MoveEntity])],
})
export class GameModule { }
