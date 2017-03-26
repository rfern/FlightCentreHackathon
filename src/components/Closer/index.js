import React from 'react';
import AltContainer from 'alt-container';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import store from '../../stores/SearchStore';
import Actions from '../../actions/SearchActions';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};


const Search = ({ searchResults, handleSearch }) => {
  return (
  <Paper zDepth={3}>
    <TextField hintText="Search for images" floatingLabelText="Search" fullWidth={true} onChange={(e, text) => { handleSearch(text.toLowerCase()) }}/>

       <div style={styles.root}>
         <GridList
           cellHeight={180}
           style={styles.gridList}
         >
           <Subheader>Search Results</Subheader>
           {searchResults.map((tile) => (
             <GridTile
               key={tile.url}
               title={tile.location}
               subtitle={tile.tags.join(', ')}
             >
               <Link to={tile.url.replace('panorama', 'vr')}>
                 <img alt={tile.location} src={tile.url} />
               </Link>
             </GridTile>
           ))}
         </GridList>
       </div>
  </Paper>
)};

const actions = {
  handleSearch: Actions.search,
};

const SearchContainer = () => (
  <AltContainer store={store} actions={actions}>
    <Search />
  </AltContainer>
);

export default SearchContainer;