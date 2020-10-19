'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../../components/layout/index';
import { ListPage } from './list';
import './index.scss';

ReactDOM.render(
  <Layout>
    <ListPage />
  </Layout>,
  document.getElementById('container')
);
