import React from 'react';
import { Link } from 'react-router-dom';
import AltContainer from 'alt-container';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

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
        Try the <Link to="/tripadvisor">Trip Advisor</Link><br />
        <br />
        DemoValue: {demoValue}<br />
        <RaisedButton style={styles.button} label="+1" onClick={() => handleClick(1)}/>
        <RaisedButton style={styles.button} label="+2" onClick={() => handleClick(2)}/>
        <RaisedButton style={styles.button} label="-1" onClick={() => handleClick(-1)}/>
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