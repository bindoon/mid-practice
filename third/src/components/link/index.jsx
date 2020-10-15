import React from 'react';
import PropTypes from 'prop-types';

export default class Link extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
  };

  handleClick = (e) => {
    e.preventDefault();
    window.location.hash = this.props.to;
  };

  render() {
    return <a onClick={this.handleClick}>{this.props.children}</a>;
  }
}
