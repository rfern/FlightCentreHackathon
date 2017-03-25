import React from 'react';
import AltContainer from 'alt-container';
import Paper from 'material-ui/Paper';
import Apps from './Apps';
import MyStore from '../stores/MyStore';
import Actions from '../actions/MyActions';

const styles = {
  page: {
    margin: 4,
  },
  button : {
    margin: 12,
  },
}

const Main = ({ demoValue, handleClick }) => (
    <div className="App-intro">
      <Paper style={styles.page} zDepth={3}>
        <Apps />
      </Paper>
    </div>
);

const actions = {
    handleClick: Actions.demoAction,
};

const MainContainer = () => (
  <AltContainer store={ MyStore } actions={ actions }>
    <Main />
  </AltContainer>
)

export { Main };
export default MainContainer;