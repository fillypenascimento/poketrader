import { EntityRepository, Repository } from 'typeorm';

import TradeRegister from '../models/TradeRegister';

@EntityRepository(TradeRegister)
class TradeRegistersRepository extends Repository<TradeRegister> {}

export default TradeRegistersRepository;
