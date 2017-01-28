import Inferno from 'inferno'
import Component from 'inferno-component'
import Map from 'pigeon-maps/inferno'
import Marker from 'pigeon-marker/inferno'
import Cluster from 'pigeon-cluster/inferno'

export default class PigeonMap extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const dims = this.props.dimensions
    return (

      <Map center={[37.887381, -4.776933]} zoom={7} width={dims.width} height={dims.height}>
        <Cluster>
          {
            this.props.places.map(place => <Marker anchor={[place.lat, place.lng]} payload={1}/>)
          }
        </Cluster>
      </Map>
    )
  }

}
