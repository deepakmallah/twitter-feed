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

    this.triggerLogin = this.triggerLogin.bind(this);
    this.triggerlogOut = this.triggerlogOut.bind(this);
  }

  componentWillMount(){
    console.log("componentWillMount componentWillMount")
  }

  triggerLogin() {
    if (!fire.firebase_.auth().currentUser) {
      // var provider = fire.firebase_.auth.TwitterAuthProvider();
      var provider = new fire.firebase_.auth.TwitterAuthProvider();

      // [START signin]
      fire.auth().signInWithPopup(provider)
        .then(function(result) {
          //Todo Add the Event after use is logged in
          var token = result.credential.accessToken;
          var secret = result.credential.secret;
          // The signed-in user info.
          var user = result.user;
          // [START_EXCLUDE]
          console.log("user", user);
          console.log("token", token);
          console.log("secret", secret);

        })
        .catch(function(error) {
          console.error(error);
        });
    } else {
      console.log("Already logged in");
    }
  }

  triggerlogOut() {
    if (fire.firebase_.auth().currentUser) {
      fire.firebase_.auth().signOut();
    }
  }


  render() {
    return (
      <Header>
        <div className={styles.logo} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ '1' ]} className={styles.menu}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/feed">Feed</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Button type="primary" onClick={this.triggerLogin}>Sign in with Twitter</Button>
          </Menu.Item>
          <Menu.Item key="4">
            <Button onClick={this.triggerlogOut}>Sign out</Button>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default HeaderComponent;
