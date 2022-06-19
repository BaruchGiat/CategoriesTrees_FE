import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import mySaga from '../saga';

// some reducers you have already created
import { reducerApp } from './app';
import { reducerTrees } from './app/trees';

// reducers 1 & 3 will be resettable, but 2 won't.
const reducer = combineReducers({
  app: reducerApp,
  trees: reducerTrees,
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

// then run the saga
sagaMiddleware.run(mySaga);

export default store;
