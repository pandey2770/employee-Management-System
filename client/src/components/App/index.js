import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Container } from 'flux/utils';
import  UserStore from '../../store/user';
import { getUser } from '../../actions';
import Home from '../Home';
import Login from '../Login';
import {logout} from '../../actions';
import Detail from '../Detail';
import Create from '../Create';
import './styles.css';

class Temp extends Component {
  logout = () => {
    const { history } = this.props;
    logout(history);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="center-content">
      {user && 
      <div>
        <span>{user.username}{this.props.location.pathname}</span>
        <input type='button' value='logout' onClick={this.logout}/>
      </div>}
      <h1>Employee Management System</h1>
      {user ?
        <Switch>
          <Route path="/create" component={Create} />
          <Route path="/employee/:id" component={Detail} />
          <Route path="/" component={Home} />
        </Switch>:
        <Login />}
    </div>
    );
  }
}

function getStores() {
  return [
    UserStore
  ];
}

function getState() {
  return {
    user: UserStore.getState()
  };
}

const Temp2 = Container.createFunctional(withRouter(Temp), getStores, getState);

class App extends Component {

  componentWillMount() {
    getUser();
  }

  render() {
    console.log('into render of app')
    const { user } = this.props;
    return (
      <Temp2 user={user} location={this.props.location.pathname} />
    );
  }
}


export default withRouter(App);
