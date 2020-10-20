'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Icon } from '@alifd/next';
import classnames from 'classnames';
import Tools from '../../utils/index';
import './index.scss';

const { Item, SubNav } = Nav;

const links = {
  index: '/demos/index.html',
  simple: '/demos/simple.html',
  help: '/demos/help.html',
  detail: '/demos/detail.html',
  dev: '/demos/dev.html',
  new: '/demos/new.html',
  list: '/demos/list.html',
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

  handleClick(selectedKeys, item, extra) {
    // 当多页面之间进行切换时，页面会刷新，所以只能通过sessionStorage来保存变量用于记录点击的是哪个链接传递到下一次页面生命周期中
    sessionStorage.setItem('selectOpenKey', extra.keyPath.slice(0).toString());
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
    const selectedOpenKey = sessionStorage.getItem('selectOpenKey');
    return (
      <div className={className}>
        <div className="fold-btn" onClick={this.foldClick}>
          {
            folden ? <Icon type="arrow-double-right" size="xs" /> : <Icon type="arrow-double-left" size="xs" />
          }
        </div>
        <Nav
          type="primary"
          onSelect={this.handleClick.bind(this)}
          direction="ver"
          iconOnly={!!folden}
          className="left-nav"
          defaultSelectedKeys={window.selectedMenuKey}
        >
          <Item
            key="index"
            className="left-nav-item"
            icon="atm"
          ><a href={links.index}>首页</a>
          </Item>
          <Item
            key="simple"
            className="left-nav-item"
            icon="atm"
          ><a href={links.simple}>simple</a>
          </Item>
          <Item
            key="redux"
            className="left-nav-item"
            icon="attachment"
          ><a href={links.help}>help</a>
          </Item>
          <Item
            key="list"
            className="left-nav-item"
            icon="attachment"
          ><a href={links.list}>list</a>
          </Item>
        </Nav>
      </div>
    );
  }
}

export default SideMenu;
