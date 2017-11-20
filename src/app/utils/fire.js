import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBJ1LX6Bk537YiRIHZoBc1FcH9WmvYF6Gw",
  authDomain: "twitter-feed-c2102.firebaseapp.com",
  databaseURL: "https://twitter-feed-c2102.firebaseio.com",
  projectId: "twitter-feed-c2102",
  storageBucket: "twitter-feed-c2102.appspot.com",
  messagingSenderId: "42306783149"
};

var fire = firebase.initializeApp(config);
export default fire;
