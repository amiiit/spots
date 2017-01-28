export const persistMapState = (dispatch, getState) => {
  const { mapState }  = getState();
  localStorage.setItem('mapState', JSON.stringify(mapState))
}

export const retrieveMapState = () => {
  return dispatch => {
    let persistedMapState = null
    try {
      persistedMapState = JSON.parse(localStorage.getItem('mapState'));
    } catch (e) {
    }
    persistedMapState && dispatch({ type: 'MAP_STATE_CHANGE', mapState: persistedMapState })
  }
}

