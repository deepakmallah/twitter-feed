import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router';

import styles from './header.css';

const { Header } = Layout;

export default () => (
  <Header>
    <div className={styles.logo} />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ '1' ]} className={styles.menu}>
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/feed">Feed</Link>
      </Menu.Item>
    </Menu>
  </Header>
);
