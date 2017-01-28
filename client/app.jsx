import 'styles/main.scss';
import Inferno from 'inferno';
import Component from 'inferno-component';

import SpotsContainer from 'spots/SpotsContainer';
import swURL from 'file?name=/sw.js!babel-loader!./sw';
import css from './app.scss';

const SW_ENABLE = true

class App extends Component {

  componentDidMount () {
    console.log('component did mount', swURL);
    if ("serviceWorker" in navigator) {
      SW_ENABLE && navigator.serviceWorker.register(swURL).then(()=>{
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
        <SpotsContainer style={{height: '100%', width: '100%'}}/>
      </div>);
  }
}

export default App
