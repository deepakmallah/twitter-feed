import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import BuiltUsing from './components/BuiltUsing';
import fire from '../../utils/fire';
import { getTweets } from '../../utils/Api';

var divStyle = {
  height: "500px",
  overflow: "scroll"
};
class FeedComponent extends Component {
  constructor(props) {
    super(props);
    this.getFeed = this.getFeed.bind(this);
    this.state = {
      tweets: []
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  getFeed() {
    if(fire.firebase_.auth().currentUser){
      getTweets()
        .then(response => {
          console.log("getTweets response", response);
          if(response.body.length){
            if(!this.state.tweets.length) this.state.tweets = response.body;
            this.setState({tweets: this.state.tweets});
          }
        })
        .catch(error => console.log(error));
    }
  }
  componentWillUnmount() {
    const list = ReactDOM.findDOMNode(this.refs["scrollDiv"])
    list.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {
    console.log("Item pushed", this.state.tweets.length)
  }

  componentDidMount(){
    const list = ReactDOM.findDOMNode(this.refs["scrollDiv"])
    list.addEventListener('scroll', this.handleScroll);
    setTimeout(()=>{
      this.getFeed()
    }, 1000)
  }

  handleScroll(event) {
    var fixed = ReactDOM.findDOMNode(this.refs['targetDiv']).getBoundingClientRect();
    var scroll = ReactDOM.findDOMNode(this.refs['targetDiv1']).getBoundingClientRect();


    if((fixed.bottom - scroll.bottom) <= 0){
      console.log("reached")
      this.state.tweets.push({ text: 'pushed '+this.state.tweets.length, imgUrl: 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/webpack.svg' });
      this.setState({tweets: this.state.tweets});
    }

    console.log('the scroll things', fixed.bottom,scroll.bottom)
  }

  render() {
    return (
      <div>
        <div className="scroll-container" style={divStyle} ref="scrollDiv">
          {this.state.tweets.map((tweet, index) =>
            <li key={tweet.id} className="image-list__item">
              <div>{tweet.text}</div>
            </li>
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
