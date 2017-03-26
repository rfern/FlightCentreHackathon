import alt from '../alt';

class SearchActions {
    constructor() {
        this.generateActions(
          'search',
        );
    }
};

export default alt.createActions(SearchActions);