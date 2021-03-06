import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import fire from '../../utils/fire';
import { getTweets } from '../../utils/Api';

import styles from "./FeedContainer.css"
var divStyle = {
  height: "500px",
  overflow: "scroll"
};

const TWEETS_ALLOWED = 20;

class FeedComponent extends Component {
  constructor(props) {
    super(props);

    this.getFeed = this.getFeed.bind(this);
    this.state = {
      tweets: [],
      loader: false
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.getMedia = this.getMedia.bind(this);
    this.triggerLogin = this.triggerLogin.bind(this);
    this.triggerlogOut = this.triggerlogOut.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  getFeed(options) {
    getTweets(options)
      .then(response => {
        if(response.body.length){
          if(!this.state.tweets.length){
            this.state.tweets = response.body
          }else{
            for(var i = 0; i < response.body.length; i++){
              if(i > 0) this.state.tweets.push(response.body[i]);  //Added this condition of avoid pushing duplicate tweets
            }
          }
          this.setState({tweets: this.state.tweets});
          this.setState({loader: false});
        }
      })
      .catch(error => console.log(error));
  }
  componentWillUnmount() {
    const list = ReactDOM.findDOMNode(this.refs["scrollDiv"]);
    list.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {
    console.log("Item pushed", this.state.tweets.length)
  }

  componentDidMount(){
    const list = ReactDOM.findDOMNode(this.refs["scrollDiv"]);
    list.addEventListener('scroll', this.handleScroll);
    setTimeout(()=>{
      if(fire.firebase_.auth().currentUser) {
        this.setState({loader: true});
        var uid = fire.firebase_.auth().currentUser ? fire.firebase_.auth().currentUser.providerData[0]["uid"] : 0;
        this.getFeed({uid: uid});
      }
    }, 1000)
  }

  handleScroll(event) {
    var fixed = ReactDOM.findDOMNode(this.refs['targetDiv']).getBoundingClientRect();
    var scroll = ReactDOM.findDOMNode(this.refs['targetDiv1']).getBoundingClientRect();

    if((fixed.bottom - scroll.bottom) <= 0){
      if(this.state.tweets.length && (this.state.tweets.length < TWEETS_ALLOWED)){
        var lastTweet = this.state.tweets[this.state.tweets.length - 1];
        var uid = fire.firebase_.auth().currentUser ? fire.firebase_.auth().currentUser.providerData[0]["uid"] : 0;
        this.getFeed({max_id: lastTweet.id, uid: uid});
        this.setState({loader: true});
      }
    }
  }

  getMedia(medias) {
    if(medias.length){
      return medias.map((media, index) => <div key={index}><img height={media.sizes.thumb.h}   src={media.media_url} /></div>);
    }
  }

  isLoggedIn(){
    var provider = new fire.firebase_.auth.TwitterAuthProvider();
    return new Promise((resolve, reject) => {
      fire.auth().signInWithPopup(provider)
        .then(function(result) {
          window.location.reload();
          resolve(true);
        })
        .catch(function(error) {
          resolve(false);
        });
    })
  }

  triggerLogin() {
    if (!fire.firebase_.auth().currentUser) {
      this.isLoggedIn()
        .then(response => {
          if(response) this.getFeed();
        })
        .catch(err => {
          console.log("isLoggedIn error", err);
        })
    } else {
      console.log("Already logged in");
    }
  }

  triggerlogOut() {
    if (fire.firebase_.auth().currentUser) {
      fire.firebase_.auth().signOut();
      this.state.tweets = [];
      this.setState({tweets: this.state.tweets});
    }
  }

  render() {
    return (
      <div>
        { this.state.loader ? <div className={styles.loader}></div> : null }
        <div style={{padding: "40px", marginBottom: "30px"}}>
          <Button type="primary" onClick={this.triggerLogin}>Sign in with Twitter</Button>
          &nbsp;&nbsp;
          <Button onClick={this.triggerlogOut}>Sign out</Button>
        </div>
        <div className="scroll-container" style={divStyle} ref="scrollDiv">
          {this.state.tweets.map((tweet, index) =>
            <div key={tweet.id} className="image-list__item" style={{border: "1px dotted", padding: "40px", marginBottom: "30px"}}>
              <p>{tweet.text}</p>
              <p>{tweet.created_at}</p>
              {tweet.entities && tweet.entities.media ? this.getMedia(tweet.entities.media) : ""}
              {tweet.extended_entities && tweet.extended_entities.media ? this.getMedia(tweet.extended_entities.media) : ""}
              <a href={`/tweet/${tweet.id}`}>Go to Tweet</a>
            </div>
          )}
          <div ref="targetDiv"></div>
        </div>
        <div ref="targetDiv1"></div>
        <p className="infinite-scroll-example__arrow" />
      </div>
    );
  }
}

export default FeedComponent;
