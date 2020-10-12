'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Layout from 'components/layout';
import List from './list';
import './index.scss';


ReactDOM.render(
  <Layout>
    <List />
  </Layout>,
  document.getElementById('container'),
);
