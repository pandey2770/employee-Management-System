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

class Logout extends Component {

  logout = () => {
    const { history } = this.props;
    logout(history);
  }

  render() {
    return <input type='button' value='logout' onClick={this.logout}/>;
  }
}

const LogoutBtn = withRouter(Logout);

class App extends Component {
  componentWillMount() {
    getUser();
  }

  static getStores() {
    return [
      UserStore
    ];
  }
  
  static calculateState(prevState, props) {
    return {
      user: UserStore.getState()
    };
  }
  
  render() {
    const { user } = this.state;
    return (
      <div>
      <div  className="center-content">
        {user && 
        <div>
          <span>{user.username}</span>
          <LogoutBtn />
        </div>}
        <h1>Employee Management System</h1>
      </div>
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

export default Container.create(App, {withProps: true, pure: false});
