import 'babel-polyfill'
import App from './app'
import './index.scss';
import Inferno, {render} from 'inferno';
import {Provider} from 'inferno-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import css from './index.scss'
import {createStore, applyMiddleware} from 'redux'
import rootReducers from './reducers'
import {fetchPlaces, retrieveMapState} from './actions'
import {combineReducers} from 'redux'

const loggerMiddleware = createLogger()

let store = createStore(
  rootReducers,
  applyMiddleware(
    thunkMiddleware,
    // loggerMiddleware
  )
)

store.dispatch(retrieveMapState())
store.dispatch(fetchPlaces())


render((
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('furgi-app'))
