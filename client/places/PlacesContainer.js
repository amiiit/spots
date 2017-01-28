import {connect} from 'inferno-redux'
import {mapStateChange} from '../actions'
import Places from './Places'

const mapStateToProps = (state, ownProps) => {
  return {
    places: state.places,
    mapState: state.mapState
  }
}

const mapDispatchToProps = dispatch => ({
  onMapStateChange: (mapState) => {
    dispatch(mapStateChange(mapState))
  }
})

const PlacesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Places)

export default PlacesContainer
