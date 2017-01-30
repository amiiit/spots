import {combineReducers} from 'redux'
import storageReducers from 'storage/reducers'
import defs from './defs'

const spots = (state = [], action) => {
  switch (action.type) {
    case defs.ADD_SPOT:
      return [
        ...state,
        {
          cTime: action.cTime
        }
      ]
    case defs.RECEIVE_SPOTS:
      return action.spots
    default:
      return state
  }
}

const activeSpot = (state = '', action) => {
  switch (action.type) {
    case defs.SPOT_SELECTED_ON_MAP:
      console.log('active spot', JSON.stringify(action))
      return action.spotId
    default:
      return state
  }
}

const mapState = (state = {}, action) => {
  switch (action.type) {
    case defs.MAP_STATE_CHANGE: {
      return Object.assign({}, state, action.mapState)
    }
    default:
      return state
  }
}

const placesApp = combineReducers({
  spots: spots,
  activeSpot,
  mapState: mapState,
  storage: storageReducers
})

export default placesApp
