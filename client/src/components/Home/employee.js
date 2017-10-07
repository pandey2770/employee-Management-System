import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteEmployee, updateEmployee } from '../../actions';
import { formatDate } from '../../utils';

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: props.emp.name,
      department: props.emp.department,
      address:props.emp.address,
      phone:props.emp.phone,
      dob:props.emp.dob,
      doj:props.emp.doj
    };
  }

  toggleEditEmployee = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing
    });
  };

  updateValue = event => {
    this.setState({
      [`${event.target.name}`]: event.target.value
    });
  };

  deleteEmployee = () => {
    const { id } = this.props.emp;
    deleteEmployee(id);
  };

  updateEmployee = () => {
    const { id } = this.props.emp;
    const { name, department, phone, address , dob, doj } = this.state;
    updateEmployee(name, department, phone, address , dob, doj, id);
    this.toggleEditEmployee();
  };

  render() {
    const { editing, name, department, phone, address , dob, doj } = this.state;
    if (editing) {
      return (
        <div>
          <input placeholder="Name" name="name" value={name} onChange={this.updateValue} />
          <input placeholder="department" name="department" value={department} onChange={this.updateValue} />
          <input placeholder="phone" name="phone" value={phone} onChange={this.updateValue} />
          <input placeholder="address" name="address" value={address} onChange={this.updateValue} />
          <input placeholder="dob" name="dob" value={dob} onChange={this.updateValue} />
          <input placeholder="doj" name="doj" value={doj} onChange={this.updateValue} />
          <input type="button" value="Save" onClick={this.updateEmployee} />
          <input type="button" value="Cancel" onClick={this.toggleEditEmployee} />
        </div>
      );
    }
    const { emp } = this.props;
    return (
      <tr>
        <td><Link to={`/employee/${emp.id}`}>{emp.name} </Link></td>
        <td>{emp.department}</td>
        <td>{emp.phone}</td>
        <td>{emp.address}</td>
        <td>{formatDate(emp.dob)}</td>
        <td>{formatDate(emp.doj)}</td>
        <td>
          <input type="button" value="Edit" onClick={this.toggleEditEmployee} />
          <input type="button" value="Delete" onClick={this.deleteEmployee} />
        </td>
      </tr>
    );
  }
}
