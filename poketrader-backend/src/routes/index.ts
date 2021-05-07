import { Router } from 'express';

import playersRouter from './players.routes';
import pokemonsRouter from './pokemons.routes';
import tradesRouter from './trades.routes';
// import tradeRegistersRouter from './tradeRegisters.routes';

const routes = Router();

routes.use('/players', playersRouter);
routes.use('/pokemons', pokemonsRouter);
routes.use('/trades', tradesRouter);

export default routes;
