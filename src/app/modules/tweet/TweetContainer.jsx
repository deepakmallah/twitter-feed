import React from 'react';
import { Component } from 'react';
import { Button } from 'antd';
import fire from '../../utils/fire';
import { getTweets } from '../../utils/Api';

class FeedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: []
    };

    this.getFeed = this.getFeed.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);

    this.tuid = this.props.routeParams.tuid;
  }

  getFeed(options) {
    getTweets(options)
      .then(response => {
        if(response.body.length){
          console.log("response.body", response.body)
          this.state.tweets = response.body
          this.setState({tweets: this.state.tweets});
        }
      })
      .catch(error => console.log(error));
  }

  componentDidMount(){
    setTimeout(()=>{
      if(fire.firebase_.auth().currentUser) {
        this.getFeed({max_id: this.tuid, count: 1});
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
        {this.state.tweets.map((tweet, index) =>
          <div key={tweet.id} className="image-list__item" style={{border: "1px dotted", padding: "40px", marginBottom: "30px"}}>
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