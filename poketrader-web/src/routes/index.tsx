import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Trades from '../pages/Trades';
import TradesHistory from '../pages/TradesHistory';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/trades" exact component={Trades} />
    <Route path="/trades/history" component={TradesHistory} />
  </Switch>
);

export default Routes;
