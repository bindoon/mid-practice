import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './mod/index';
import Simple from '../simple';
import Help from '../help';
import './index.scss';

ReactDOM.render(
  <Router>
    <Route path="/" exact component={Home} />
    <Route path="/simple" component={Simple} />
    <Route path="/help" component={Help} />
  </Router>,
  document.getElementById('container'),
);
