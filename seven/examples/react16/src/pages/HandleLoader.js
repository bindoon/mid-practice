import { loadMicroApp } from 'qiankun';
import React from 'react';

export default class App extends React.Component {
  containerRef = React.createRef();

  microApp = null;

  componentDidMount() {
    this.microApp = loadMicroApp(
      { name: 'app1', entry: '//localhost:7102', container: this.containerRef.current, props: { name: 'qiankun' } },
    );
  }

  componentWillUnmount() {
    this.microApp.unmount();
  }

  componentDidUpdate() {
    // this.microApp.update({ name: 'test' });
  }

  render() {
    return <div ref={this.containerRef}></div>;
  }
}