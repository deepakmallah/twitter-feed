import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Root from './modules/root';
// import Home from './modules/home';
import Feed from './modules/feed';
import Tweet from './modules/tweet';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Feed} />
    <Route path="feed" component={Feed} />
    <Route path="tweet/:tuid" component={Tweet} />
  </Route>
);

