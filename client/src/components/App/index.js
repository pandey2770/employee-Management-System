import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Detail from '../Detail';
import './styles.css';

const App = () => 
  <div className='center'>
    <h1>Employee Management System</h1>
    <Switch>
      <Route path="/emp" component={Detail} />
      <Route path="/" component={Home} />
    </Switch>
  </div>

export default App;
