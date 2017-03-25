import alt from '../alt';

class MyActions {
    constructor() {
        this.generateActions(
          'demoAction',
        );
    }
};

export default alt.createActions(MyActions);