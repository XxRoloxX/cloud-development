import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GameEntity } from './game.entity';
import { IsInt, Max, Min } from 'class-validator';

@Entity()
export class MoveEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  player_id: string;

  @Column()
  @Min(0)
  @Max(2)
  @IsInt()
  positionX: number;

  @Column()
  @Min(0)
  @Max(2)
  @IsInt()
  positionY: number;

  @ManyToOne(() => GameEntity, (game) => game.moves)
  game: GameEntity;
}
