import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

const configureStore = () => {
  const persistedState = loadState();
  const middlewares = [
    thunk,
    promise,
    process.env.NODE_ENV !== 'production' && createLogger(),
  ].filter(Boolean);

  const enhancer = compose(applyMiddleware(...middlewares));
  // finally create store and apply the middlewares
  const store = createStore(reducers, persistedState, enhancer);

  store.subscribe(throttle(() => {
    saveState({
      auth: store.getState().auth
    });
  }, 1000));

  return store;
};

export default configureStore
