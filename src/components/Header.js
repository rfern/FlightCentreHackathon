import React from 'react';
import FlightLand from 'material-ui/svg-icons/action/flight-land'
//import logo from './logo.svg';

const Header = () => (
    <div className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}

        <FlightLand style={{ height: '5em', width: '5em' }}/>
        <h2>Welcome to Trippy</h2>
    </div>
);

export default Header;
