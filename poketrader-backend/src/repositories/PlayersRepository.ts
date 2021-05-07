import { EntityRepository, Repository } from 'typeorm';

import Player from '../models/Player';

@EntityRepository(Player)
class PlayersRepository extends Repository<Player> {}

export default PlayersRepository;
