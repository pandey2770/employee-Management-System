import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  state = {
    userData: [],
  }

  componentWillMount() {
    this.searchUsers();
  }
  
  searchUsers = () => {
    const that = this;
    axios.get(`api/employee`)
      .then(({ data }) => {
        that.setState({
      userData: data
      });
    });
  }


  render() {
    const { userData } = this.state;    
    return (
      <div className='center'>
        <h1>Employee Management System</h1>
        {userData.map(user => (
          <div>
            <div>
              <span>{user.name}</span>
              <span>{user.department}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };
}
export default App;
