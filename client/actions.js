import fetch from 'isomorphic-fetch'
import {persistMapState, retrieveMapState} from 'storage/actions'
import defs from './defs'

const STATIC_DATA = true;

export const mapStateChange = (newMapState) => {
  return dispatch => {
    const now = Date.now()

    dispatch({
      type: 'MAP_STATE_CHANGE',
      cTime: now,
      mapState: newMapState
    })

    dispatch(persistMapState)

  }
}

export const requestSpots = () => {
  return {
    type: defs.REQUEST_SPOTS,
  }
}

export const spotSelectedOnMap = id => {
  return {
    type: defs.SPOT_SELECTED_ON_MAP,
    spotId: id
  }
}
export const receiveSpots = places => {
  return {
    type: defs.RECEIVE_SPOTS,
    spots: places,
    receivedAt: Date.now()
  }
}

const normalizedSpanishData = (json) => {
  const data = json.data || json
  return data.map(furgiRawObject => {
    const normalizedObject = Object.assign({}, furgiRawObject)
    const { lat, lng, nombre } = furgiRawObject
    normalizedObject.lat = Number.parseFloat(lng)
    normalizedObject.lng = Number.parseFloat(lat)
    normalizedObject.name = nombre
    delete normalizedObject.nombre
    normalizedObject.image = normalizedObject.imagen
    delete normalizedObject.imagen
    return normalizedObject
  })
}

export const fetchSpots = () => {
  return dispatch => {
    dispatch(requestSpots())
    const url = STATIC_DATA ? require('file-loader!assets/static_data.json') : 'http://localhost:3001/spots'
    fetch(url)
      .then(response => response.json())
      .then(json => normalizedSpanishData(json))
      .then(data => dispatch(receiveSpots(data)))
  }
}

export {retrieveMapState}
