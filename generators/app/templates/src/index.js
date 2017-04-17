import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';

// let pagePath, apiPath, apiSuffix;
// if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'debugremote') {
//   pagePath = 'wealth/page/newAccount/requestWitness';
//   apiPath = `${location.protocol}//${location.host}/wealth/api/newAccount`;
//   apiSuffix = '';
// } else if (process.env.NODE_ENV === 'development') {
//   pagePath = 'pages/index';
//   apiPath = `${location.protocol}//${location.host}/data`;
//   apiSuffix = '.json';
// }
const rootEl = document.getElementById('J-activity');
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    import('react-hot-loader').then(({AppContainer}) => {
      const render = () => ReactDOM.render(<AppContainer><App /></AppContainer>, rootEl);
      render();
      module.hot.accept('./App', render);
    });
  }
} else {
  ReactDOM.render(<App />, document.getElementById('J-activity'));
}
