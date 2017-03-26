import React from 'react';
import { Link } from 'react-router-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    maxHeight: '90vh',
    overflowY: 'auto',
    paddingBottom: '1em',
  },
};

const tilesData = [
  {
    img: '/thumbnails/thumbnailCreteGreece.jpg',
    title: 'Closer',
    author: 'remark',
    link: '/closer',
  },
  {
    img: '/thumbnails/thumbnailEgypt Sphinx.jpg',
    title: 'Closer VR Demo (Egypt)',
    author: 'remark',
    href: '/demo.html',
  },
  {
    img: '/thumbnails/thumbnailSwissAlps.jpg',
    title: 'Tour advisor',
    author: 'remark',
    link: '/tripadvisor'
  },
];

const AppLink = ({tile}) => {
  if (tile.href) {
    return (
      <a href={tile.href}>
        <img style={{width: '100%', height: 180}} alt={tile.title} src={tile.img} />
      </a>
    );
  }
  return (
    <Link to={tile.link}>
      <img style={{width: '100%', height: 180}} alt={tile.title} src={tile.img} />
    </Link>
  );
};

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const Apps = () => (
  <div style={styles.root}>
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      <Subheader>Available Applications</Subheader>
      {tilesData.map((tile, index) => (
        <GridTile
          key={index}
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
        <AppLink tile={tile}/>
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default Apps;