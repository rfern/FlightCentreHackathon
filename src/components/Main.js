import React from 'react';
import AltContainer from 'alt-container';
import Paper from 'material-ui/Paper';
import Apps from './Apps';

const styles = {
  page: {
    margin: 4,
  },
}

const Main = ({ demoValue, handleClick }) => (
    <div className="App-intro">
      <Paper style={styles.page} zDepth={3}>
        <Apps />
      </Paper>
    </div>
);

export default Main;