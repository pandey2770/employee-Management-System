import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteEmployee, updateEmployee } from '../../actions';

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: props.emp.name,
      department: props.emp.department,
      month: props.emp.month
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
    const { name, department, month } = this.state;
    updateEmployee(name, department, month, id);
    this.toggleEditEmployee();
  };

  render() {
    const { editing, name, department, month } = this.state;
    if (editing) {
      return (
        <div>
          <input placeholder="Name" name="name" value={name} onChange={this.updateValue} />
          <input placeholder="department" name="department" value={department} onChange={this.updateValue} />
          <input placeholder="month" name="month" value={month} onChange={this.updateValue} />
          <input type="button" value="Save" onClick={this.updateEmployee} />
          <input type="button" value="Cancel" onClick={this.toggleEditEmployee} />
        </div>
      );
    }
    const { emp } = this.props;
    return (
      <tr>
        <td><Link to={`/emp/${emp.id}`}>{emp.name} </Link></td>
        <td>{emp.department}</td>
        <td>{emp.month}</td>
        <td>
          <input type="button" value="Edit" onClick={this.toggleEditEmployee} />
          <input type="button" value="Delete" onClick={this.deleteEmployee} />
        </td>
      </tr>
    );
  }
}
