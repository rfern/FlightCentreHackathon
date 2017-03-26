import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/Home'
import Tripadvisor from './components/Tripadvisor'
import Closer from './components/Closer'
import Panoramic from './components/Closer/panoramic'
import './App.css';

const App = () => (
  <MuiThemeProvider>
    <BrowserRouter>
        <div>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/tripadvisor' component={Tripadvisor} />
            <Route path='/tripadvisor/:travelMode/:origin/:destination' component={Tripadvisor} />
            <Route path='/closer' component={Closer} />
            <Route path='/vr/:name' component={Panoramic} />
        </div>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;
