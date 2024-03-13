import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoveEntity } from 'src/entity/move.entity';

@Injectable()
export class MovesService {
  constructor(
    @InjectRepository(MoveEntity)
    private moveRepository: Repository<MoveEntity>,
  ) { }
}
