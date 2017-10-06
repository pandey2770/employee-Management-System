import React, { Component } from 'react';
import { createEmployee } from '../../actions';

export default class CreateEmployee extends Component {
  state = {
    name: '',
    department: '',
    month: ''
  };

  updateValue = event => {   
    this.setState({
      [`${event.target.name}`]: event.target.value
    });
  };

  createEmployee = () => {
    const { name, department, month } = this.state;
    createEmployee(name, department, month);
  };

  render() {
    const { name, department, month } = this.state;
    return (
      <div>
        <input placeholder="Name" name="name" value={name} onChange={this.updateValue} />
        <input placeholder="department" name="department" value={department} onChange={this.updateValue} />
        <input placeholder="month" name="month" value={month} onChange={this.updateValue} />
        <input type="button" value="Save" onClick={this.createEmployee} />
      </div>
    );
  }
}
