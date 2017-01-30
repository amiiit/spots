import React, {Component, PropTypes as T} from 'react';
import PigeonMap from './PigeonMap'

import css from './spots.scss'

class SpotsMap extends Component {

  constructor (props) {
    super(props);
    this.state = {
      ownDimensions: {
        width: 0,
        height: 0
      }
    }
  }

  componentDidMount () {
    this.setDimensions = () => {
      this.setState({
        ownDimensions: {
          height: this.rootNode.offsetHeight,
          width: this.rootNode.offsetWidth
        }
      })
    }
    window.addEventListener('resize', this.setDimensions.bind(this));
    this.setDimensions()
  }

  componentWillUnmount () {
    window.removeEventListener(this.setDimensions)
  }

  render () {
    return (
      <div ref={node => this.rootNode = node} style={{ width: '100%', height: '100%' }}>
        <PigeonMap {...this.props} dimensions={this.state.ownDimensions}/>
      </div>
    )
  }

}

export default SpotsMap
