import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { createEmployee } from '../../actions';

class CreateEmployee extends Component {
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
    createEmployee(name, department, month, this.props.history);
  };

  render() {
    const { name, department, month } = this.state;
    return (
      <div>
        <input placeholder="Name" name="name" value={name} onChange={this.updateValue} />
        <input placeholder="department" name="department" value={department} onChange={this.updateValue} />
        <input placeholder="month" name="month" value={month} onChange={this.updateValue} />
        <input type="button" value="Save" onClick={this.createEmployee} />
        <Link to={`/`}><input type='button' value='show' /></Link>
      </div>
    );
  }
}

export default withRouter(CreateEmployee);
