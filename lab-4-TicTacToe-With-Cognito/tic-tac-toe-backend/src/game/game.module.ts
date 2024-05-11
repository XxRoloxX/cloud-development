import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { MovesModule } from './moves/moves.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from 'src/entity/game.entity';
import { GameController } from './game.controller';
import { MoveEntity } from 'src/entity/move.entity';
import { EventsGateway } from './game.socket';
import IAuthService from 'src/auth/interfaces/auth.interface';
import { CognitoService } from 'src/auth/cognito/cognito.service';

@Module({
  controllers: [GameController],
  providers: [EventsGateway, GameService, {
    provide: IAuthService,
    useClass: CognitoService
  }],
  imports: [MovesModule, TypeOrmModule.forFeature([GameEntity, MoveEntity])],
})
export class GameModule { }
