import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import Home from '../Home';
import Login from '../Login';
import {logout} from '../../actions';
import Detail from '../Detail';
import Create from '../Create';
import './styles.css';

class App extends Component {

  logout = () => {
    const { history } = this.props;
    logout(history);
  }

  render() {
    return (
      <div className="center-content">
        <input type='button' value='logout' onClick={this.logout}/>
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

export default  withRouter(App);
