import React from 'react';
import PropTypes from 'prop-types';

export default class Link extends React.Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
  };

  handleClick = (e) => {
    e.preventDefault();
    window.location.hash = this.props.path;
  };

  render() {
    return <a onClick={this.handleClick}>{this.props.children}</a>;
  }
}
