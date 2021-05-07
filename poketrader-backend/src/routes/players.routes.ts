import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import PlayersRepository from '../repositories/PlayersRepository';

import CreatePlayerService from '../services/CreatePlayerService';

const playersRouter = Router();

playersRouter.get('/', async (request, response) => {
  const playersRepository = getCustomRepository(PlayersRepository);
  const players = await playersRepository.find();

  return response.json(players);
});

playersRouter.post('/', async (request, response) => {
  try {
    const { name } = request.body;

    const createUser = new CreatePlayerService();

    const player = await createUser.execute({ name });

    return response.json(player);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default playersRouter;
