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
  {
    location: 'Victoria',
    url: '/panorama/12ApostlesVic.jpg',
    tags: ['nature victoria'],
  },
  {
    location: 'France',
    url: '/panorama/AbbeyFrance.jpg',
    tags: ['architecture'],
  },
  {
    location: 'Croatia',
    url: '/panorama/BeachCroatia.jpg',
    tags: ['beach nature'],
  },
  {
    location: 'USA',
    url: '/panorama/BryceCanyonUSA.jpg',
    tags: ['nature america'],
  },
  {
    location: 'Canada',
    url: '/panorama/Canada_Ottawa_Panorama.jpg',
    tags: ['ottawa'],
  },
  {
    location: 'Germany',
    url: '/panorama/CologneGermany.jpg',
    tags: ['cologne'],
  },
  {
    location: 'Greece',
    url: '/panorama/CreteGreece.jpg',
    tags: ['crete'],
  },
  {
    location: 'Russia',
    url: '/panorama/FineArtMuseumRussia.jpg',
    tags: ['architecture'],
  },
  {
    location: 'Florida',
    url: '/panorama/FloridaKeys.jpg',
    tags: ['keys nature'],
  },
  {
    location: 'Germany',
    url: '/panorama/HohbergenGermany.jpg',
    tags: ['hohbergen'],
  },
  {
    location: 'Florence',
    url: '/panorama/HotelFlorence.jpg',
    tags: ['accomodation italy'],
  },
  {
    location: 'New York',
    url: '/panorama/HotelNY.jpg',
    tags: ['NY accomodation'],
  },
  {
    location: 'Switzerland',
    url: '/panorama/Mountains.jpg',
    tags: ['swiss alps nature'],
  },
  {
    location: 'New Zealand',
    url: '/panorama/MtCookNZ.jpg',
    tags: ['nature nz mt cook'],
  },
  {
    location: 'Canada',
    url: '/panorama/NiagraCanada.jpg',
    tags: ['niagara nature'],
  },
  {
    location: 'Tasmania',
    url: '/panorama/SevenMileBeachTasmania.jpg',
    tags: ['nature tas'],
  },
  {
    location: 'Germany',
    url: '/panorama/St_Bartholomae_Germany.jpg',
    tags: ['architecture'],
  },
  {
    location: 'Switzerland',
    url: '/panorama/SwissAlps.jpg',
    tags: ['swiss alps'],
  },
  {
    location: 'Sydney',
    url: '/panorama/Sydney_Harbour_Bridge_night.jpg',
    tags: ['architecture australia'],
  },
  {
    location: 'Sydney',
    url: '/panorama/Sydney.jpg',
    tags: ['architecture australia'],
  },
  {
    location: 'New York',
    url: '/panorama/TimesSquareNY.jpg',
    tags: ['architecture ny usa america'],
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
