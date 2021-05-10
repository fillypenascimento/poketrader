import { IPokemon } from './IPokemon';
import { IPlayer } from './IPlayer';
import { ITradeRegister } from './ITradeRegister';

export interface ITrade {
  id: string;
  from_player_id: string;
  fromPlayer: IPlayer;
  to_player_id: string;
  toPlayer: IPlayer;
  fair_trade: boolean;
  fairness_rate: number;
  from_player_pokemons: IPokemon[];
  to_player_pokemons: IPokemon[];
  created_at: Date;
  tradeRegisters: ITradeRegister[];
}
