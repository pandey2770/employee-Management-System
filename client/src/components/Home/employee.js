import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  
  render() {
    const { index, emp } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td><Link to={`/employee/${emp.id}`}>{emp.name} </Link></td>
        <td>{emp.department}</td>
        <td>{emp.phone}</td>
        <td>{emp.address}</td>
        <td>{formatDate(emp.dob)}</td>
        <td>{formatDate(emp.doj)}</td>
        <Link to={`/employee/${emp.id}`}><input type='button' value='preview' /></Link>
      </tr>
    );
  }
}
