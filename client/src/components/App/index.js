import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { getEmployees } from '../../actions';
import Home from '../Home';
import Detail from '../Detail';
import './styles.css';

class App extends Component {
  componentWillMount() {
    getEmployees();
  }

  render() {
    return (
      <div className="center">
        <h1>Employee Management System</h1>
        <Switch>
          <Route path="/emp" component={Detail} />
          <Route path="/" component={Home} />
        </Switch>
    </div>);
  }
}

export default App;
