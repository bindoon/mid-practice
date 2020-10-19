import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Icon } from '@alifd/next';
import classnames from 'classnames';
import './index.scss';

const { Item } = Nav;

const links = {
  index: '/demos/index.html',
};

class SideMenu extends React.Component {
  static propTypes = {
    onMenuFolden: PropTypes.func,
    folden: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.foldClick = this.foldClick.bind(this);
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
          defaultSelectedKeys={window.selectedMenuKey}
        >
          <Item key="index" className="left-nav-item" icon="atm">
            <a href={links.index}>首页</a>
          </Item>
        </Nav>
      </div>
    );
  }
}

export default SideMenu;
