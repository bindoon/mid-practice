import * as React from 'react';
import { Search, Nav, Shell, } from '@alifd/next';
import { AppLink } from '@ice/stark';

export default function Layout({ children }) {
  return (
    <Shell style={{ border: '1px solid #eee' }}>
      <Shell.Branding>
        <div className="rectangular" />
        <span style={{ marginLeft: 10 }}>App Name</span>
      </Shell.Branding>
      <Shell.Navigation direction="hoz">
        <Search key="2" shape="simple" type="dark" placeholder="Search" style={{ width: '200px' }} />
      </Shell.Navigation>
      <Shell.Action>
        <img style={{width: 24}} src="https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png" className="avatar" alt="用户头像" />
        <span style={{ marginLeft: 10 }}>MyName</span>
      </Shell.Action>

      <Shell.Navigation>
        <Nav embeddable aria-label="global navigation">
          <Nav.Item icon="account">
            <AppLink to="/">Framework Home</AppLink>
          </Nav.Item>
          <Nav.Item icon="account">
            <AppLink to="/about">Framework About</AppLink>
          </Nav.Item>
          <Nav.Item icon="account">
            <AppLink to="/dashboard">Framework Dashboard</AppLink>
          </Nav.Item>
          <Nav.Item icon="account">
            <AppLink to="/child">Child Home</AppLink>
          </Nav.Item>
          <Nav.Item icon="account">
            <AppLink to="/child/about">Child About</AppLink>
          </Nav.Item>
          <Nav.Item icon="account">
            <AppLink to="/child/dashboard">Child Dashboard</AppLink>
          </Nav.Item>
        </Nav>
      </Shell.Navigation>

      <Shell.Content>
        <div style={{ minHeight: 1200, background: '#fff' }}>
          {children}
        </div>
      </Shell.Content>
    </Shell>
  );
}