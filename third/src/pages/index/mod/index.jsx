import React from 'react';
import Layout from '../../../components/layout';

class Home extends React.Component {
  render() {
    return (
      <Layout>
        <div className="home-page">
          <div className="big-text">
            这里可以是整站的首页，一个带layout的独立页面。
          </div>
        </div>
      </Layout>
    );
  }
}
export default Home;
