import alt from '../alt'
import Actions from '../actions/SearchActions'

const defaultSearchResults = [
  {
    location: 'Boston',
    file: 'Boston.jpg',
    tags: ['america'],
  },
  {
    location: 'Bulgaria',
    file: 'Bulgaria-Alexander-Nevsky-Church.jpg',
    tags: ['church', 'architecture'],
  },
  {
    location: 'Egypt',
    file: 'Egypt Sphinx.jpg',
    tags: ['architecture'],
  },
  {
    location: 'Victoria',
    file: '12ApostlesVic.jpg',
    tags: ['nature'],
  },
  {
    location: 'France',
    file: 'AbbeyFrance.jpg',
    tags: ['architecture'],
  },
  {
    location: 'Croatia',
    file: 'BeachCroatia.jpg',
    tags: ['beach', 'nature'],
  },
  {
    location: 'USA',
    file: 'BryceCanyonUSA.jpg',
    tags: ['nature', 'america'],
  },
  {
    location: 'Canada',
    file: 'Canada_Ottawa_Panorama.jpg',
    tags: ['ottawa'],
  },
  {
    location: 'Germany',
    file: 'CologneGermany.jpg',
    tags: ['cologne'],
  },
  {
    location: 'Greece',
    file: 'CreteGreece.jpg',
    tags: ['crete'],
  },
  {
    location: 'Russia',
    file: 'FineArtMuseumRussia.jpg',
    tags: ['architecture'],
  },
  {
    location: 'Florida',
    file: 'FloridaKeys.jpg',
    tags: ['keys', 'nature'],
  },
  {
    location: 'Germany',
    file: 'HohbergenGermany.jpg',
    tags: ['hohbergen'],
  },
  {
    location: 'Florence',
    file: 'HotelFlorence.jpg',
    tags: ['accomodation', 'hotel', 'italy'],
  },
  {
    location: 'New York',
    file: 'HotelNY.jpg',
    tags: ['NY', 'accomodation'],
  },
  {
    location: 'Switzerland',
    file: 'Mountains.jpg',
    tags: ['swiss alps', 'nature'],
  },
  {
    location: 'New Zealand',
    file: 'MtCookNZ.jpg',
    tags: ['nature', 'nz', 'mt cook'],
  },
  {
    location: 'Canada',
    file: 'NiagraCanada.jpg',
    tags: ['niagara', 'nature'],
  },
  {
    location: 'Tasmania',
    file: 'SevenMileBeachTasmania.jpg',
    tags: ['nature', 'tas'],
  },
  {
    location: 'Germany',
    file: 'St_Bartholomae_Germany.jpg',
    tags: ['architecture'],
  },
  {
    location: 'Switzerland',
    file: 'SwissAlps.jpg',
    tags: ['swiss alps'],
  },
  {
    location: 'Sydney',
    file: 'Sydney_Harbour_Bridge_night.jpg',
    tags: ['architecture', 'australia'],
  },
  {
    location: 'Sydney',
    file: 'Sydney.jpg',
    tags: ['architecture', 'australia'],
  },
  {
    location: 'New York',
    file: 'TimesSquareNY.jpg',
    tags: ['architecture', 'ny', 'usa', 'america'],
  },
  {
    location: 'Fishburners Brisbane',
    file: 'Fishburners.jpg',
    tags: ['australia qld hackathon'],
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

    this.searchText = '';
    this.searchResults = [];
  }

  handleSearch(search) {
    this.searchText = search;
    if (!search) {
      this.searchResults = [];
    } else {
      this.searchResults = defaultSearchResults
        .filter(result => match(result, search.toLowerCase()))
        .sort(result => result.location);
    }
  }
}

export default alt.createStore(SearchStore, 'SearchStore');
