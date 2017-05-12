import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const configureStore = preloadedState => {

  const store = createStore(
    reducers,
    preloadedState,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    import('./reducers').then(m => store.replaceReducer(m.default));
  }

  return store;
};

export default configureStore;
