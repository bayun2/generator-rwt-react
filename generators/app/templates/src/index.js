import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ActivityChange from './app';
import configureStore from './stores/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ActivityChange />
  </Provider>,
  document.getElementById('J-activity')
)
