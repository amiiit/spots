import 'styles/main.scss';
import React, {Component} from 'react';
import Drawer from './drawer/Drawer';
import SpotsMapContainer from 'map/SpotsMapContainer';
import swURL from '!file?name=/sw.js!babel-loader!./sw';
import css from './app.scss';

const SW_ENABLE = process.env.NODE_ENV !== 'development'

class App extends Component {

  componentDidMount () {
    console.log('component did mount', swURL);
    if ("serviceWorker" in navigator) {
      SW_ENABLE && navigator.serviceWorker.register(swURL).then(() => {
        console.info('service worker registered');
      }).catch(err => {
        console.warn('service worker failed', err);
      });
    } else {
      console.warn('service worker not supported');
    }
  }

  render () {
    return (
      <div className={css.root}>
        <SpotsMapContainer style={{ height: '100%', width: '100%' }}/>
        <Drawer origin='bottom'/>
      </div>);
  }
}

export default App
