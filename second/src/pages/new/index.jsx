'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';


class New extends React.Component {
  render() {
    return (
      <div className="container">
        这是一个普普通通的新建页
      </div>);
  }
}

ReactDOM.render(<New />, document.getElementById('container'));
