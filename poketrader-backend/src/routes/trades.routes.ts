import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import TradesRepository from '../repositories/TradesRepository';

import CreateTradeService from '../services/CreateTradeService';
import CreateTradeRegistersService from '../services/CreateTradeRegistersService';
import Trade from '../models/Trade';
import TradeRegister from '../models/TradeRegister';
import UpdatePokemonOwnerService from '../services/UpdatePokemonOwnerService';
import Pokemon from '../models/Pokemon';

const tradesRouter = Router();

tradesRouter.get('/', async (request, response) => {
  const tradesRepository = getCustomRepository(TradesRepository);
  const trades = await tradesRepository.find();

  return response.json(trades);
});

tradesRouter.post('/', async (request, response) => {
  try {
    const {
      from_player_id,
      to_player_id,
      fair_trade,
      fairness_rate,
      from_player_pokemons,
      to_player_pokemons,
    } = request.body;

    const createTrade = new CreateTradeService();
    const createTradeRegisters = new CreateTradeRegistersService();
    const updatePokemonOwner = new UpdatePokemonOwnerService();

    const trade: Trade = await createTrade.execute({
      from_player_id,
      to_player_id,
      fair_trade,
      fairness_rate,
    });

    const tradeRegisters: TradeRegister[] = await createTradeRegisters.execute({
      trade_id: trade.id,
      player1_id: from_player_id,
      player2_id: to_player_id,
      player1_pokemons: from_player_pokemons,
      player2_pokemons: to_player_pokemons,
    });

    // isolate in another service
    from_player_pokemons.forEach((pokemon: Pokemon) =>
      updatePokemonOwner.execute({
        id: pokemon.id,
        owner_id: to_player_id,
      }),
    );

    to_player_pokemons.forEach((pokemon: Pokemon) =>
      updatePokemonOwner.execute({
        id: pokemon.id,
        owner_id: from_player_id,
      }),
    );

    return response.json({ trade, tradeRegisters });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default tradesRouter;
