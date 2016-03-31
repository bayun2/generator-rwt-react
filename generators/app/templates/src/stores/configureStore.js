import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import changeActivityApp from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(
    changeActivityApp,
    initialState,
    applyMiddleware(thunkMiddleware)
  );
  return store;
}
