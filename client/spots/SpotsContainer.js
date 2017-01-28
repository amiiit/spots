import {connect} from 'inferno-redux'
import {mapStateChange} from '../actions'
import Spots from './Spots'

const mapStateToProps = (state, ownProps) => {
  return {
    spots: state.spots,
    mapState: state.mapState
  }
}

const mapDispatchToProps = dispatch => ({
  onMapStateChange: (mapState) => {
    dispatch(mapStateChange(mapState))
  }
})

const SpotsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Spots)

export default SpotsContainer
