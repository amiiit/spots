import Inferno from 'inferno'
import Component from 'inferno-component'
import Map from 'pigeon-maps/inferno'
import Marker from 'pigeon-marker/inferno'
import Cluster from 'pigeon-cluster/inferno'
import {get} from 'lodash'

export default class PigeonMap extends Component {
  constructor (props) {
    super(props);
  }

  handleBoundsChange = bounds => {
    this.setState({
      bounds
    })
  }

  render () {
    const dims = this.props.dimensions
    return (

      <Map center={[37.887381, -4.776933]}
           zoom={get(this.state, 'bounds.zoom', 7)}
           width={dims.width}
           height={dims.height}
           onBoundsChanged={this.handleBoundsChange}
           attribution="Data from furgovw.org is under Creative Commons 3">
        <Cluster>
          {
            this.props.spots.map(place => <Marker anchor={[place.lat, place.lng]} payload={1}/>)
          }
        </Cluster>
      </Map>
    )
  }

}
