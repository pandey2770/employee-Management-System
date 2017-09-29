import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    userData: [],
    edit: true
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

  deleteEmployee =(event)=>{
    const { id }= event.target.dataset;    
     axios.delete(`/api/employee/${id}`)
  };
  onDesChange = (event) => {
    this.setState({
      name:event.target.value,
    });  
  }
  change = (event) => {
    this.setState({
      department:event.target.value,
    });
  }
  createEmployee = () => {
    const { name } = this.state;   
    const { department } = this.state;
    axios.post(
      '/api/employee',
      { employee: {name, department} }
    );
  };

  changeName = (event) => {
    const { id } = event.target.dataset;           
    this.setState({
      name:event.target.value,
    });
  }

  changeDepartment = (event) => {
    this.setState({
    department:event.target.value,
    });
  }

  updateField = (event) => {
    const { id } = event.target.dataset;
    console.log(id)
    const { name } = this.state;   
    console.log(name)
    const { department } = this.state;
    console.log(department)
    
    axios.put(
      `/api/employee/${id}`,
      { employee: {name, department, id} }
    );
  }

  editEmployee = (event) => {
    this.setState({edit : !this.state.edit })
  }
  getName = (edit, user) => {
    if (edit) {
      return (
        <span>
          <span>{user.name}</span>
          <span>{user.department}</span>
          <input type='button' value='x'data-id={user.id} onClick={this.deleteEmployee}/>
        </span>
      )
    } else {
      return (
        <span>
          <input type='text' placeholder={user.name} value = { this.state.updateName } onChange={ this.changeName }/>
          <input type='text'  placeholder={user.department} value = { this.state.updateDepartment } onChange={ this.changeDepartment }/>
          <input type='button' value='send' data-id={user.id} onClick={this.updateField}/> 
        </span>
      )
    }
  }

  render() { 
    const { userData } = this.state;  
    const { name } = this.state;      
    const { department } = this.state;
    return (
      <div className='center'>
        <h1>Employee Management System</h1>
        <input type='text' placeholder='name' value={ name } onChange={ this.onDesChange }/>
        <input type='text' placeholder='department' value={ department } onChange={ this.change }/>
        <input type='button' onClick={this.createEmployee}/>
        {userData.map(user => (
          <div>
            <div>
              {this.getName(this.state.edit, user)}
              <input type='button' value='e'data-id={user.id} onClick={this.editEmployee}/>
            </div>
          </div>
        ))}
      </div>
    );
  };
}
export default App;
