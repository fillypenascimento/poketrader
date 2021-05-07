import { getCustomRepository } from 'typeorm';

import Pokemon from '../models/Pokemon';
import TradeRegister from '../models/TradeRegister';

import TradeRegistersRepository from '../repositories/TradeRegistersRepository';
// import UpdatePokemonOwnerService from './UpdatePokemonOwnerService';

// import AppError from '../errors/AppError';

interface IRequestDTO {
  trade_id: string;
  player1_id: string;
  player2_id: string;
  player1_pokemons: Pokemon[];
  player2_pokemons: Pokemon[];
}

class CreateTradeRegistersService {
  public async execute({
    trade_id,
    player1_id,
    player2_id,
    player1_pokemons,
    player2_pokemons,
  }: IRequestDTO): Promise<TradeRegister[]> {
    const tradeRegistersRepository = getCustomRepository(
      TradeRegistersRepository,
    );

    const tradeRegistersPlayer1 = player1_pokemons.map((pokemon: Pokemon) =>
      tradeRegistersRepository.create({
        trade_id,
        pokemon_id: pokemon.id,
        old_owner_id: player1_id,
        new_owner_id: player2_id,
      }),
    );

    const tradeRegistersPlayer2 = player2_pokemons.map((pokemon: Pokemon) =>
      tradeRegistersRepository.create({
        trade_id,
        pokemon_id: pokemon.id,
        old_owner_id: player2_id,
        new_owner_id: player1_id,
      }),
    );

    const tradeRegisters = [...tradeRegistersPlayer1, ...tradeRegistersPlayer2];

    await tradeRegistersRepository.save(tradeRegisters);

    return tradeRegisters;
  }
}

export default CreateTradeRegistersService;
