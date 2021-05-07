import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Player from './Player';
import TradeRegister from './TradeRegister';

@Entity('pokemons')
class Pokemon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer')
  resource_id: number;

  @Column()
  name: string;

  @Column('integer')
  base_experience: number;

  @Column()
  owner_id: string;

  @ManyToOne(() => Player, owner => owner.pokemons)
  @JoinColumn({ name: 'owner_id' })
  owner: Player;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => TradeRegister, tradeRegisters => tradeRegisters.pokemon)
  tradeRegisters: TradeRegister[];
}

export default Pokemon;
