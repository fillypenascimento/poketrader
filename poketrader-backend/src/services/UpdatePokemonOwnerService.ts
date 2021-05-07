import { getCustomRepository } from 'typeorm';

import Pokemon from '../models/Pokemon';

import PokemonsRepository from '../repositories/PokemonsRepository';

import AppError from '../errors/AppError';

interface IRequestDTO {
  id: string;
  owner_id: string;
}

class UpdatePokemonOwnerService {
  public async execute({ id, owner_id }: IRequestDTO): Promise<Pokemon> {
    const pokemonsRepository = getCustomRepository(PokemonsRepository);

    const pokemon = await pokemonsRepository.findOne(id);

    if (!pokemon) {
      throw new AppError('Pokemon not found in the database.');
    }

    pokemon.owner_id = owner_id;

    await pokemonsRepository.save(pokemon);

    return pokemon;
  }
}

export default UpdatePokemonOwnerService;
