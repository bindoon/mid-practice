import React from 'react';
import ReactDOM from 'react-dom';
import Route from '../../components/router';
import Home from './mod/index';
import Simple from '../simple';
import Help from '../help';
import './index.scss';

ReactDOM.render(
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/simple" component={Simple} />
    <Route path="/help" component={Help} />
  </div>,
  document.getElementById('container'),
);
