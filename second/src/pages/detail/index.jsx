'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';


class Detail extends React.Component {
  render() {
    return (
      <div className="container">
        这是一个普普通通的详情页
      </div>);
  }
}

ReactDOM.render(<Detail />, document.getElementById('container'));
