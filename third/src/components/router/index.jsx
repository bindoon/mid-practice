import React from 'react';
import PropTypes from 'prop-types';

function matchPath(url, { exact, path }) {
  const pathname =
    (url.indexOf('?') === -1
      ? url.substring(0)
      : url.substring(0, url.indexOf('?'))) || '/';
  if (exact) {
    return pathname === path;
  }

  return pathname.startsWith(path);
}

export default class Route extends React.Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    component: PropTypes.elementType,
  };

  componentDidMount() {
    window.addEventListener('hashchange', this.updateView, false);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.updateView, false);
  }

  updateView = () => {
    this.forceUpdate();
  };

  render() {
    const { path, exact, component } = this.props;
    const match = matchPath(window.location.hash.replace(/^#/, ''), {
      exact,
      path,
    });
    if (!match) {
      return null;
    }
    if (component) {
      return React.createElement(component);
    }
    return null;
  }
}
