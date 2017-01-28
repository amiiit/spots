const storageReducers = (state = {}, action) => {
  switch (action.type) {
    case 'PERSIST_MAP_STATE': {
      return state
    }
    default:
      return state
  }
}

export default storageReducers
