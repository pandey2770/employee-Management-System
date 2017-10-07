import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { getEmployees } from '../../actions';
import Home from '../Home';
import Login from '../Login';
import Detail from '../Detail';
import Create from '../Create';
import './styles.css';

class App extends Component {
  componentWillMount() {
    getEmployees();
  }

  render() {
    return (
      <div className="center-content">
        <h1>Employee Management System</h1>
        <Switch>
          <Route path="/show" component={Create} />
          <Route path="/employee/:id" component={Detail} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
    </div>);
  }
}

export default App;
