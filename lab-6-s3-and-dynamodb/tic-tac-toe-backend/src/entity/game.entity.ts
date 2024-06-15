import { GameStatus, PlayerTurn } from 'src/common/game';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MoveEntity } from './move.entity';

@Entity('game')
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "enum",
    enum: GameStatus,
    default: GameStatus.PENDING
  })
  status: GameStatus;

  @Column({
    type: "enum",
    enum: PlayerTurn,
    default: PlayerTurn.Player1

  })
  currentTurn: PlayerTurn;

  @Column({ nullable: true, default: null })
  player1_id: string | null;
  @Column({ nullable: true, default: null })
  player1_name: string | null;

  @Column({ nullable: true, default: null })
  player2_id: string | null;
  @Column({ nullable: true, default: null })
  player2_name: string | null;

  @OneToMany(() => MoveEntity, (move) => move.game, { cascade: true })
  moves: MoveEntity[];
}
