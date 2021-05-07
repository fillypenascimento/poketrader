import { getCustomRepository } from 'typeorm';

import Trade from '../models/Trade';

import TradesRepository from '../repositories/TradesRepository';

// import AppError from '../errors/AppError';

interface IRequestDTO {
  from_player_id: string;
  to_player_id: string;
  fair_trade: boolean;
  fairness_rate: number;
}

class CreateTradeService {
  public async execute({
    from_player_id,
    to_player_id,
    fair_trade,
    fairness_rate,
  }: IRequestDTO): Promise<Trade> {
    const tradesRepository = getCustomRepository(TradesRepository);

    const trade = tradesRepository.create({
      from_player_id,
      to_player_id,
      fair_trade,
      fairness_rate,
    });

    await tradesRepository.save(trade);

    return trade;
  }
}

export default CreateTradeService;
