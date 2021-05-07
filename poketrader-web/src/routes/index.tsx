import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import TradesHistory from '../pages/TradesHistory';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/trades" component={TradesHistory} />
  </Switch>
);

export default Routes;
