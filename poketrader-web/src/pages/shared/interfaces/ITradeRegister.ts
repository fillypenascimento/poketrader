import { IPokemon } from './IPokemon';

export interface ITradeRegister {
  id: string;
  trade_id: string;
  old_owner_id: string;
  new_owner_id: string;
  pokemon: IPokemon;
}
