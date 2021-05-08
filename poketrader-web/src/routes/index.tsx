import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Trades from '../pages/Trades';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/trades" component={Trades} />
  </Switch>
);

export default Routes;
