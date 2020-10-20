'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from '../../components/layout/index';
import { UserForm } from '../../components/form';
import './index.scss';

const CreatePage = () => <UserForm />;

ReactDOM.render(
  <Layout>
    <CreatePage />
  </Layout>,
  document.getElementById('container')
);
