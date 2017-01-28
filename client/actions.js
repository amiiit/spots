import fetch from 'isomorphic-fetch'
import {persistMapState, retrieveMapState} from 'storage/actions'

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

export const requestPlaces = () => {
  return {
    type: 'REQUEST_PLACES',
  }
}

export const receivePlaces = places => {
  return {
    type: 'RECEIVE_PLACES',
    places: places,
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

export const fetchPlaces = () => {
  return dispatch => {
    dispatch(requestPlaces())
    const url = STATIC_DATA ? require('file-loader!assets/static_data.json') : 'http://localhost:3001/places'
    fetch(url)
      .then(response => response.json())
      .then(json => normalizedSpanishData(json))
      .then(data => dispatch(receivePlaces(data)))
  }
}

export {retrieveMapState}
