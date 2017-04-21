import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    import('react-hot-loader').then(({AppContainer}) => {
      const render = () => ReactDOM.render(<AppContainer><App /></AppContainer>, rootEl);
      render();
      module.hot.accept('./App', render);
    });
  }
} else {
  ReactDOM.render(<App />, rootEl);
}
