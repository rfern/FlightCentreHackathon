import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home'
import Tripadvisor from './components/Tripadvisor'
import './App.css';

const App = () => (
    <BrowserRouter>
        <div>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/tripadvisor' component={Tripadvisor} />
            <Route path='/tripadvisor/:travelMode/:origin/:destination' component={Tripadvisor} />
        </div>
    </BrowserRouter>
);

export default App;
