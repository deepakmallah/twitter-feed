import React from 'react';
import { Component } from 'react';
import BuiltUsing from './components/BuiltUsing';
import fire from '../../utils/fire';
import { getTweets } from '../../utils/Api';

const technologies = [
  { text: 'WebPack', imgUrl: 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/webpack.svg' },
  { text: 'React', imgUrl: 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/react.svg' },
  {
    text: 'React Router',
    imgUrl: 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/react-router.svg',
  },
  { text: 'Babel', imgUrl: 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/babel.svg' },
  { text: 'PostCSS', imgUrl: 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/postcss.svg' },
  { text: 'ESLint', imgUrl: 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/eslint.svg' },
  { text: 'Jest', imgUrl: 'https://s3-us-west-2.amazonaws.com/svgporn.com/logos/jest.svg' },
  {
    text: 'Ant Design',
    imgUrl: 'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg',
  },
];

class FeedComponent extends Component {
  constructor(props) {
    super(props);
    this.getFeed = this.getFeed.bind(this);
  }

  getFeed() {
    if(fire.firebase_.auth().currentUser){
      getTweets()
        .then(response => {
          console.log("getTweets response", response);
        })
        .catch(error => console.log(error));
    }
  }

  componentDidMount(){
    setTimeout(()=>{
      this.getFeed()
    }, 1000)
  }

  render() {
    return (
      <BuiltUsing technologies={technologies} />
    );
  }
}

export default FeedComponent;
