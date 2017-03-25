import alt from '../alt'
import Actions from '../actions/MyActions'

class MyStore {
  constructor() {
    this.bindListeners({
      handleDemoAction: Actions.demoAction,
    });

    this.demoValue = 0;
  }

  handleDemoAction(value) {
    this.demoValue += value;
  }
}

export default alt.createStore(MyStore, 'MyStore');