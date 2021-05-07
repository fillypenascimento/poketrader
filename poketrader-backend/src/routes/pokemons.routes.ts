import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import PokemonsRepository from '../repositories/PokemonsRepository';

import CreatePokemonService from '../services/CreatePokemonService';
import UpdatePokemonOwnerService from '../services/UpdatePokemonOwnerService';

const pokemonsRouter = Router();

pokemonsRouter.get('/', async (request, response) => {
  const pokemonsRepository = getCustomRepository(PokemonsRepository);
  const pokemons = await pokemonsRepository.find();

  return response.json(pokemons);
});

pokemonsRouter.post('/', async (request, response) => {
  try {
    const { resource_id, name, base_experience, owner_id } = request.body;

    const createPokemon = new CreatePokemonService();

    const pokemon = await createPokemon.execute({
      resource_id,
      name,
      base_experience,
      owner_id,
    });

    return response.json(pokemon);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

pokemonsRouter.patch('/owner', async (request, response) => {
  try {
    const { id, owner_id } = request.body;

    const updatePokemonOwner = new UpdatePokemonOwnerService();

    const pokemon = await updatePokemonOwner.execute({
      id,
      owner_id,
    });

    return response.json(pokemon);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default pokemonsRouter;
