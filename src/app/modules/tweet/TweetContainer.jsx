import React from 'react';
import { Component } from 'react';
import { Button } from 'antd';
import fire from '../../utils/fire';
import { getTweets, vote } from '../../utils/Api';

import styles from '../feed/FeedContainer.css'

class FeedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      loader: false,
      vote: 0
    };

    this.getFeed = this.getFeed.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);

    this.tuid = this.props.routeParams.tuid;
  }

  upvote() {
    this.setState({loader: true});
    var options = {tid: this.tuid, type: "up"};
    vote(options)
      .then(response => {
        if(response.body){
          console.log("response.body", response.body)
          this.state.tweets[0]["tweetData"]["vote"] = response.body.vote;
          this.setState({tweets: this.state.tweets});

          this.setState({loader: false});
        }
      })
      .catch(error => console.log(error));
  }

  downvote() {
    this.setState({loader: true});
    var options = {tid: this.tuid, type: "down"};
    vote(options)
      .then(response => {
        if(response.body){
          console.log("response.body", response.body)
          this.state.tweets[0]["tweetData"]["vote"] = response.body.vote;
          this.setState({tweets: this.state.tweets});

          this.setState({loader: false});
        }
      })
      .catch(error => console.log(error));
  }

  getFeed(options) {
    getTweets(options)
      .then(response => {
        if(response.body.length){
          console.log("response.body", response.body)
          this.state.tweets = response.body
          this.setState({tweets: this.state.tweets});
          this.setState({loader: false});
        }
      })
      .catch(error => console.log(error));
  }

  componentDidMount(){
    setTimeout(()=>{
      if(fire.firebase_.auth().currentUser) {
        var uid = fire.firebase_.auth().currentUser ? fire.firebase_.auth().currentUser.providerData[0]["uid"] : 0;
        this.getFeed({max_id: this.tuid, count: 1, uid: uid});
        this.setState({loader: true});
      }
    }, 1000)
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
          resolve(true);
        })
        .catch(function(error) {
          resolve(false);
        });
    })
  }

  render() {
    return (
      <div>
        { this.state.loader ? <div className={styles.loader}></div> : null }
        {this.state.tweets.map((tweet, index) =>
          <div key={tweet.id} className="image-list__item" style={{border: "1px dotted", padding: "40px", marginBottom: "30px"}}>
            <div style={{float: "right"}}>
              {(tweet.tweetData && tweet.tweetData.view) ? <p style={{fontWeight: "bold"}}>View Count: {tweet.tweetData.view}</p> : ""}
              {(tweet.tweetData && tweet.tweetData.vote) ? <p style={{fontWeight: "bold"}}>View Count: {tweet.tweetData.vote}</p> : ""}
              <br />
              <Button type="primary" onClick={this.upvote}>Up Vote</Button>
              &nbsp;&nbsp;
              <Button type="primary" onClick={this.downvote}>Down Vote</Button>
            </div>
            <p>{tweet.text}</p>
            <p>{tweet.created_at}</p>
            {tweet.entities && tweet.entities.media ? this.getMedia(tweet.entities.media) : ""}
            {tweet.extended_entities && tweet.extended_entities.media ? this.getMedia(tweet.extended_entities.media) : ""}
          </div>
        )}
      </div>
    );
  }
}

export default FeedComponent;
