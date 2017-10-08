import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { createEmployee } from '../../actions';

class CreateEmployee extends Component {
  state = {
    name: '',
    department: '',
    phone:'',
    address:'',
    dob:'',
    doj:''
  };

  updateValue = event => {   
    this.setState({
      [`${event.target.name}`]: event.target.value
    });
  };

  createEmployee = () => {
    const { name, department, phone, address , dob, doj } = this.state;
    createEmployee(name, department, phone, address , dob, doj, this.props.history);
  };

  render() {
    const { name, department, phone, address , dob, doj } = this.state;
    return (
      <div>
        <input placeholder="Name" name="name" value={name} onChange={this.updateValue} />
        <input placeholder="department" name="department" value={department} onChange={this.updateValue} />
        <input placeholder="phone" name="phone" value={phone} onChange={this.updateValue} />
        <input placeholder="address" name="address" value={address} onChange={this.updateValue} />
        <input type="date" placeholder="dob" name="dob" value={dob} onChange={this.updateValue} />
        <input type="date" placeholder="doj" name="doj" value={doj} onChange={this.updateValue} />
        <input type="button" value="Save" onClick={this.createEmployee} />
        <Link to={`/`}><input type='button' value='Go To List Page' /></Link>
      </div>
    );
  }
}

export default withRouter(CreateEmployee);
