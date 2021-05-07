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

  @OneToMany(() => Trade, requestedTrade => requestedTrade.fromPlayer, {
    eager: true,
  })
  requestedTrades: Trade[];

  @OneToMany(() => Trade, acceptedTrades => acceptedTrades.toPlayer, {
    eager: true,
  })
  acceptedTrades: Trade[];
}

export default Player;
