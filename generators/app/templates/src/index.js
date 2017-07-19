import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// redux
// import {Provider} from 'react-redux';
// import App from './redux/containers/AppContainer';
// import store from './redux/store';

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);

// const initStore = store({a: {}});

// const render = () => ReactDOM.render(
//   <Provider store={initStore}>
//     <App />
//   </Provider>,
//   rootEl
// );

const render = () => ReactDOM.render(<App />, rootEl);

render();

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./redux/containers/AppContainer', render);
}
