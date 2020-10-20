'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../../components/layout/index';
import './index.scss';

const DetailPage = () => <div>Hello world</div>;

ReactDOM.render(
  <Layout>
    <DetailPage />
  </Layout>,
  document.getElementById('container'),
);
