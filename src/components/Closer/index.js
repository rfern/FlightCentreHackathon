import React from 'react';
import AltContainer from 'alt-container';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

import store from '../../stores/SearchStore';
import Actions from '../../actions/SearchActions';


const styles = {
  paper: {
    padding: '1em',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '80vw',
    maxHeight: '90vh',
    overflowY: 'auto',
    paddingBottom: '1em',
  },
};


const Search = ({ searchText, searchResults, handleSearch }) => {
  return (
  <Paper style={styles.paper} zDepth={3}>
    <TextField value={searchText} hintText="Search for images" floatingLabelText="Search" fullWidth={true} onChange={(e, text) => { handleSearch(text.toLowerCase()) }}/>

       <div style={styles.root}>
         <GridList
           cellHeight={180}
           style={styles.gridList}
         >
           <Subheader>Search Results</Subheader>
           {searchResults.map((tile) => (
             <Link to={`/vr/${tile.file}`}>
               <GridTile
                 key={tile.file}
                 title={tile.location}
                 subtitle={tile.tags.join(', ')}
               >
                 <img style={{width: '100%', height: 180}} alt={tile.location} src={`/thumbnails/thumbnail${tile.file}`} />
               </GridTile>
             </Link>
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