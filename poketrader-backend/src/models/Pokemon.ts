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

  @ManyToOne(() => Player, owner => owner.pokemon, { eager: true })
  @JoinColumn({ name: 'owner_id' })
  owner: Player;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Pokemon;
