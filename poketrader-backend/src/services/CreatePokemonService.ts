import { getCustomRepository } from 'typeorm';

import Pokemon from '../models/Pokemon';

import PokemonsRepository from '../repositories/PokemonsRepository';

import AppError from '../errors/AppError';

interface IRequestDTO {
  resource_id: number;
  name: string;
  base_experience: number;
  owner_id: string;
}

class CreatePokemonService {
  public async execute({
    resource_id,
    name,
    base_experience,
    owner_id,
  }: IRequestDTO): Promise<Pokemon> {
    const pokemonsRepository = getCustomRepository(PokemonsRepository);

    const checkPokemonExists = await pokemonsRepository.findOne({
      where: { resource_id },
    });

    if (checkPokemonExists) {
      throw new AppError(`Pokemon ${name} already registered in the database.`);
    }

    const pokemon = pokemonsRepository.create({
      resource_id,
      name,
      base_experience,
      owner_id,
    });

    await pokemonsRepository.save(pokemon);

    return pokemon;
  }
}

export default CreatePokemonService;
