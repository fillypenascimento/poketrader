import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Pokemon from './Pokemon';
import Trade from './Trade';

@Entity('players')
class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Pokemon, pokemon => pokemon.owner)
  pokemon: Pokemon;

  @OneToMany(() => Trade, tradeFrom => tradeFrom.fromPlayer)
  tradeFrom: Trade;

  @OneToMany(() => Trade, tradeTo => tradeTo.toPlayer)
  tradeTo: Trade;
}

export default Player;
