import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Icon } from '@alifd/next';
import classnames from 'classnames';
import Link from '../link';
import './index.scss';

const { Item } = Nav;

class SideMenu extends React.Component {
  static propTypes = {
    onMenuFolden: PropTypes.func,
    folden: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.foldClick = this.foldClick.bind(this);
  }

  getDefaultSelectedKeys() {
    const url = window.location.hash.replace(/^#/, '');
    const path =
      (url.indexOf('?') === -1
        ? url.substring(0)
        : url.substring(0, url.indexOf('?'))) || '/';
    return path;
  }

  foldClick() {
    this.props.onMenuFolden(!this.props.folden);
  }

  render() {
    const { folden } = this.props;
    const className = classnames({
      'left-menu': true,
      'left-menu-folden': folden,
    });
    return (
      <div className={className}>
        <div className="fold-btn" onClick={this.foldClick}>
          {folden ? (
            <Icon type="arrow-double-right" size="xs" />
          ) : (
            <Icon type="arrow-double-left" size="xs" />
          )}
        </div>
        <Nav
          type="primary"
          direction="ver"
          iconOnly={!!folden}
          className="left-nav"
          defaultSelectedKeys={this.getDefaultSelectedKeys()}
        >
          <Item key="/" className="left-nav-item" icon="atm">
            <Link path="/">首页</Link>
          </Item>
          <Item key="/simple" className="left-nav-item" icon="atm">
            <Link path="/simple">simple</Link>
          </Item>
          <Item key="/help" className="left-nav-item" icon="attachment">
            <Link path="/help">help</Link>
          </Item>
        </Nav>
      </div>
    );
  }
}

export default SideMenu;
