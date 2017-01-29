import Inferno from 'inferno'
import Component from 'inferno-component'
import Map from 'pigeon-maps/inferno'
import Marker from 'pigeon-marker/inferno'
import Cluster from 'pigeon-cluster/inferno'
import {get, partial} from 'lodash'

export default class PigeonMap extends Component {
  constructor (props) {
    super(props);
    this.state = {}
  }

  handleBoundsChange = bounds => {
    this.props.onMapStateChange(bounds)
  }

  handleMarkerClick = (spot, e) => {
    this.props.onSpotSelected(spot.id)
  }

  render () {
    const dims = this.props.dimensions

    return (

      <Map center={get(this.props, 'mapState.center', [37.887381, -4.776933])}
           zoom={get(this.props, 'mapState.zoom', 7)}
           width={dims.width}
           height={dims.height}
           onBoundsChanged={this.handleBoundsChange}
           attribution="Data from furgovw.org is under Creative Commons 3">
        <Cluster>
          {
            this.props.spots.map(spots => (
              <Marker anchor={[spots.lat, spots.lng]}
                      payload={1}
                      onClick={partial(this.handleMarkerClick, spots)}
              />))
          }
        </Cluster>
      </Map>
    )
  }

}
