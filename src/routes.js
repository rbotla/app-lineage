import React from 'react';
import { Route } from 'react-router';
import App from './App';
import Nodes from './components/nodes';
import ForcedGraph from './components/forced-graph';

export default (
  <Route component={App}>
    <Route path="/" component={Nodes} />
    <Route path="/graph" component={ForcedGraph} />
  </Route>
);