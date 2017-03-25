import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/Home'
import Tripadvisor from './components/Tripadvisor'
import Closer from './components/Closer'
import './App.css';

const App = () => (
  <MuiThemeProvider>
    <BrowserRouter>
        <div>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/tripadvisor' component={Tripadvisor} />
            <Route path='/tripadvisor/:travelMode/:origin/:destination' component={Tripadvisor} />
            <Route path='/Closer' component={Closer} />
        </div>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;
