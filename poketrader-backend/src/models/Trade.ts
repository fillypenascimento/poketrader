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

@Entity('trades')
class Trade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // user id who requested the trade
  @Column()
  from_player_id: string;

  @ManyToOne(() => Player, fromPlayer => fromPlayer.requestedTrades, {
    eager: true,
  })
  @JoinColumn({ name: 'from_player_id' })
  fromPlayer: Player;

  // user id who accepted the trade
  @Column()
  to_player_id: string;

  @ManyToOne(() => Player, toPlayer => toPlayer.acceptedTrades, { eager: true })
  @JoinColumn({ name: 'to_player_id' })
  toPlayer: Player;

  @Column('boolean')
  fair_trade: boolean;

  @Column('decimal')
  fairness_rate: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => TradeRegister, tradeRegisters => tradeRegisters.trade, {
    eager: true,
  })
  tradeRegisters: TradeRegister;
}

export default Trade;
