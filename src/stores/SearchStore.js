import alt from '../alt'
import Actions from '../actions/SearchActions'

const defaultSearchResults = [
  {
    location: 'Boston',
    url: '/panorama/Boston.jpg',
    tags: ['cool', 'some other tag'],
  },
  {
    location: 'Bulgaria',
    url: '/panorama/Bulgaria-Alexander-Nevsky-Church.jpg',
    tags: ['church', 'architecture'],
  },
  {
    location: 'Egypt',
    url: '/panorama/Egypt Sphinx.jpg',
    tags: ['architecture'],
  },
];

const match = (record, text) => {
  const {location, tags} = record;

  return location.toLowerCase().indexOf(text) >= 0 || tags.find(tag => tag.indexOf(text) >= 0)
}

class SearchStore {
  constructor() {
    this.bindListeners({
      handleSearch: Actions.search,
    });

    this.searchResults = [];
  }

  handleSearch(search) {
    if (!search) {
      this.searchResults = [];
    } else {
      this.searchResults = defaultSearchResults.filter(result => match(result, search.toLowerCase()));
    }
  }
}

export default alt.createStore(SearchStore, 'SearchStore');