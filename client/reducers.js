import {combineReducers} from 'redux'
import storageReducers from 'storage/reducers'

const spots = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SPOT':
      return [
        ...state,
        {
          cTime: action.cTime
        }
      ]
    case 'RECEIVE_SPOTS':
      return action.spots
    default:
      return state
  }
}

const mapState = (state = {}, action) => {
  switch (action.type) {
    case 'MAP_STATE_CHANGE': {
      return Object.assign({}, state, action.mapState)
    }
    default:
      return state
  }
}

const placesApp = combineReducers({
  spots: spots,
  mapState: mapState,
  storage: storageReducers
})

export default placesApp
