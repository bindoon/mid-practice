'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../../components/layout/index';
import './index.scss';

const EditPage = () => <div>Hello world</div>;

ReactDOM.render(
  <Layout>
    <EditPage />
  </Layout>,
  document.getElementById('container'),
);
