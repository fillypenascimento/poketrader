import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Player from './Player';
import Pokemon from './Pokemon';
import Trade from './Trade';

@Entity('trade_registers')
class TradeRegister {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  trade_id: string;

  @ManyToOne(() => Trade)
  @JoinColumn({ name: 'trade_id' })
  trade: Trade;

  @Column()
  pokemon_id: string;

  @ManyToOne(() => Pokemon)
  @JoinColumn({ name: 'pokemon_id' })
  pokemon: Pokemon;

  @Column()
  old_owner_id: string;

  @ManyToOne(() => Player)
  @JoinColumn({ name: 'old_owner_id' })
  oldOwner: Player;

  @Column()
  new_owner_id: string;

  @ManyToOne(() => Player)
  @JoinColumn({ name: 'new_owner_id' })
  newOwner: Player;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TradeRegister;
