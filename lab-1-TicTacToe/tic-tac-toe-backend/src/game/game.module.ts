import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { MovesModule } from './moves/moves.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from 'src/entity/game.entity';
import { GameController } from './game.controller';
import { MoveEntity } from 'src/entity/move.entity';

@Module({
  controllers: [GameController],
  providers: [GameService],
  imports: [MovesModule, TypeOrmModule.forFeature([GameEntity, MoveEntity])],
})
export class GameModule {
}
