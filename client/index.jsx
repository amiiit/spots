import 'babel-polyfill'
import AppContainer from './AppContainer'
import './index.scss';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import css from './index.scss'
import {createStore, applyMiddleware} from 'redux'
import rootReducers from './reducers'
import {fetchSpots, retrieveMapState} from './actions'
import {combineReducers} from 'redux'

const loggerMiddleware = createLogger()

let store = createStore(
  rootReducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

store.dispatch(retrieveMapState())
store.dispatch(fetchSpots())


render((
    <Provider store={store}>
      <AppContainer />
    </Provider>
  ),
  document.getElementById('furgi-app'))
