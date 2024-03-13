import { Module } from '@nestjs/common';
import { MovesService } from './moves.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoveEntity } from 'src/entity/move.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MoveEntity])],
  providers: [MovesService],
})
export class MovesModule { }
