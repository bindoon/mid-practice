'use strict';

import React from 'react';
import 'antd/dist/antd.css';
import classnames from 'classnames';
import Header from '../header/index';
import SideMenu from '../side-menu/index';
import './index.scss';

export class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folden: false,
    };
    this.onMenuFolden = this.onMenuFolden.bind(this);
  }

  onMenuFolden(flag) {
    this.setState({
      folden: flag,
    });
  }

  render() {
    const { folden } = this.state;
    const className = classnames({
      'right-content': true,
      'right-content-full': !folden,
    });
    return (
      <div className="main container">
        <Header />
        <div className="main-content">
          <SideMenu onMenuFolden={this.onMenuFolden} folden={this.state.folden} />
          <div className={className}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
