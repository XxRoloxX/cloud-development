import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GameEntity } from './game.entity';
import { IsInt, Max, Min } from 'class-validator';
import { PlayerTurn } from 'src/common/game';

@Entity()
export class MoveEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: PlayerTurn,
    default: PlayerTurn.Player1
  })
  playerTurn: PlayerTurn;

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
