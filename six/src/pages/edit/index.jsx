'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../../components/layout/index';
import './index.scss';

const CreatePage = () => <div>Hello world</div>;

ReactDOM.render(
  <Layout>
    <CreatePage />
  </Layout>,
  document.getElementById('container'),
);
