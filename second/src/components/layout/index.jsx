'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/index';
import SideMenu from '../side-menu/index';
import classnames from 'classnames';
import './index.scss';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
    ]),
  }

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
