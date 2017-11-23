import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router';
import { Component } from 'react';
import fire from '../../../../utils/fire';

import styles from './header.css';

const { Header } = Layout;

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    console.log("componentWillMount componentWillMount")
  }

  render() {
    return (
      <Header>
        <div className={styles.logo} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ '1' ]} className={styles.menu}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          {/*<Menu.Item key="2">*/}
            {/*<Link to="/feed">Feed</Link>*/}
          {/*</Menu.Item>*/}
        </Menu>
      </Header>
    );
  }
}

export default HeaderComponent;
