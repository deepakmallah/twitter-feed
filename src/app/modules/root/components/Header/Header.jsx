import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router';
import { Component } from 'react';
import fire from '../../../../utils/fire';

import styles from './header.css';

const { Header } = Layout;

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount(){
    console.log("componentWillMount componentWillMount")
  }

  handleClick() {
    console.log('The link was clicked.', fire.firebase_.auth().currentUser.providerData);
    if (!fire.firebase_.auth().currentUser) {
      // [START createprovider]
      // var provider = fire.firebase_.auth.TwitterAuthProvider();
      var provider = new fire.firebase_.auth.TwitterAuthProvider();
      // [END createprovider]
      // [START signin]
      fire.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        // The signed-in user info.
        var user = result.user;
        // [START_EXCLUDE]
        console.log("user", user);
        console.log("token", token);
        console.log("secret", secret);

      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
        // [END_EXCLUDE]
      });
      // [END signin]
    } else {
      console.log("Already logged in");
      // [START signout]
      // fire.auth().signOut();
      // [END signout]
    }
  }


  render() {
    return (
      <Header>
        <div className={styles.logo} />
        <button onClick={this.handleClick}>
          Activate Lasers
        </button>
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
  }
}

export default HeaderComponent;
