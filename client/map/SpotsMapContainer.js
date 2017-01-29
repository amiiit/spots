import {connect} from 'inferno-redux'
import {mapStateChange, spotSelectedOnMap} from '../actions'
import SpotsMap from './SpotsMap'

const mapStateToProps = (state, ownProps) => {
  return {
    spots: state.spots,
    mapState: state.mapState
  }
}

const mapDispatchToProps = dispatch => ({
  onMapStateChange: (mapState) => {
    dispatch(mapStateChange(mapState))
  },
  onSpotSelected: spotId => {
    dispatch(spotSelectedOnMap(spotId))
  }
})

const SpotsMapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotsMap)

export default SpotsMapContainer
