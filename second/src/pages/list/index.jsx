'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import List from './list';
import './index.scss';


class ListPage extends React.Component {
  render() {
    return (
      <div>
        <List />
      </div>);
  }
}

ReactDOM.render(<ListPage />, document.getElementById('container'));
