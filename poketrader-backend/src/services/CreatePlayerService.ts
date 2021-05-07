import { getCustomRepository } from 'typeorm';

import Player from '../models/Player';

import PlayersRepository from '../repositories/PlayersRepository';

import AppError from '../errors/AppError';

interface IRequestDTO {
  name: string;
}

class CreatePlayerService {
  public async execute({ name }: IRequestDTO): Promise<Player> {
    const playersRepository = getCustomRepository(PlayersRepository);

    const checkPlayerExists = await playersRepository.findOne({
      where: { name },
    });

    if (checkPlayerExists) {
      throw new AppError('Player name already exists.');
    }

    const player = playersRepository.create({ name });

    await playersRepository.save(player);

    return player;
  }
}

export default CreatePlayerService;
