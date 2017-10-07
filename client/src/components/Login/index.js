import React, { Component } from 'react';
import { login } from '../../actions';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  updateValue = event => {   
    this.setState({
      [`${event.target.name}`]: event.target.value
    });
  };

  login = () => {
    const { username, password } = this.state;
    login(username, password);
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <div><input placeholder="Username" name="username" value={username} onChange={this.updateValue} /></div>
        <div><input type="password" placeholder="Password" name="password" value={password} onChange={this.updateValue} /></div>
        <div><input type="button" value="Login" onClick={this.login}/></div>
      </div>
    );
  }
}

export default Login;
