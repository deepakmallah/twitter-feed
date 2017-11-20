import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader';
import { Router, browserHistory } from 'react-router';

import appRoutes from './app/Routes';

const render = (routes) => {
  const root = (
    <AppContainer>
      <Router history={browserHistory}>{routes}</Router>
    </AppContainer>
  );
  ReactDOM.render(root, document.getElementById('app'));
};

render(appRoutes);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app/Routes', () => {
    // eslint-disable-next-line global-require
    const NewApp = require('./app/Routes').default;
    render(NewApp);
  });
}
