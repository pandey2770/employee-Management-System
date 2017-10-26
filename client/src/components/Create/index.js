import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { createEmployee } from '../../actions';
import { uploadAvatar } from '../../utils';

class CreateEmployee extends Component {
  state = {
    employee: {
      name: '',
      department: '',
      phone:'',
      address:'',
      dob:'',
      doj:''
    }
  };

  updateValue = event => {   
    const { employee } = this.state;
    this.setState({
      employee: { ...employee, [`${event.target.name}`]: event.target.value }
    });
  };

  createEmployee = () => {
    const { employee } = this.state;
    createEmployee(employee, this.props.history);
  };

  uploadAvatar = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      uploadAvatar(event.target.files[0], this.setAvatarInState);
    }
  };

  setAvatarInState = (avatar) => {
    const { employee } = this.state;
    this.setState({
      employee: { ...employee, avatar }
    });
  }

  render() {
    const { employee } = this.state;
    return (
      <div>
        <div><input placeholder="Name" name="name" value={employee.name} onChange={this.updateValue} /></div>
        <div><input placeholder="department" name="department" value={employee.department} onChange={this.updateValue} /></div>
        <div><input placeholder="phone" name="phone" value={employee.phone} onChange={this.updateValue} /></div>
        <div><input placeholder="address" name="address" value={employee.address} onChange={this.updateValue} /></div>
        <div><input type="date" placeholder="dob" name="dob" value={employee.dob} onChange={this.updateValue} /></div>
        <div><input type="date" placeholder="doj" name="doj" value={employee.doj} onChange={this.updateValue} /></div>
        <img src={employee.avatar} height="100px" width="100px" />
        <div><input type="file" onChange={this.uploadAvatar} /></div>
        <div><input type="button" value="Save" onClick={this.createEmployee} /></div>
        <div><Link to={`/`}><input type='button' value='Go To List Page' /></Link></div>
      </div>
    );
  }
}

export default withRouter(CreateEmployee);
