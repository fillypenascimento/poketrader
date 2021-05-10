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

  @OneToMany(() => Pokemon, pokemon => pokemon.owner, { eager: true })
  pokemons: Pokemon[];

  @OneToMany(() => Trade, requestedTrade => requestedTrade.fromPlayer)
  requestedTrades: Trade[];

  @OneToMany(() => Trade, acceptedTrades => acceptedTrades.toPlayer)
  acceptedTrades: Trade[];
}

export default Player;
