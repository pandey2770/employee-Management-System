import React, { Component } from 'react';
import axios from 'axios';
import {Container} from 'flux/utils';
import { createEmployee, deleteEmployee, updateEmployee } from '../../actions';
import AppStore from '../../store';
import './styles.css';

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
    createEmployee(name, department, month);
  };

  render() {
    const { name, department, month } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={this.updateValue}
        />
        <input
          type="text"
          placeholder="department"
          name="department"
          value={department}
          onChange={this.updateValue}
        />
        <input
          type="text"
          placeholder="month"
          name="month"
          value={month}
          onChange={this.updateValue}
        />
        <input type="button" value="Save" onClick={this.createEmployee} />
      </div>
    );
  }
}

class Emp extends Component {
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
    console.log(this.props.emp,'asdada')
    deleteEmployee(id);
  };

  updateEmployee = () => {
    const { name, department, month } = this.state;
    const { id } = this.props.emp;
    updateEmployee(name, department, month, id);
    this.toggleEditEmployee();
  };

  render() {
    const { editing } = this.state;
    if (editing) {
      const { name, department, month } = this.state;
      return (
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.updateValue}
          />
          <input
            type="text"
            placeholder="department"
            name="department"
            value={department}
            onChange={this.updateValue}
          />
          <input
            type="text"
            placeholder="month"
            name="month"
            value={month}
            onChange={this.updateValue}
          />
          <input type="button" value="Save" onClick={this.updateEmployee} />
          <input
            type="button"
            value="Cancel"
            onClick={this.toggleEditEmployee}
          />
        </div>
      );
    }
    const { emp } = this.props;
    return (
      <tr>
        <td>
          {emp.name}
        </td>
        <td>
          {emp.department}
        </td>
        <td>
          {emp.month}
        </td>
        <input type="button" value="Edit" onClick={this.toggleEditEmployee} />
        <input type="button" value="Delete" onClick={this.deleteEmployee} />
      </tr>
    );
  }
}

class ListEmployees extends Component {
  state = {
    name: '',
    department: '',
    month: ''
  };

  componentWillReceiveProps(props) {
    this.setState({
      empData: props.employees
    });
  }

  sortEmployee = event => {
    const { empData, sortField, sortOrder } = this.state;
    const { name: field } = event.target;    
    let order = 'asc';
    if (field === sortField) {
      order = sortOrder === 'asc' ? 'desc' : 'asc';
    }    
    empData.sort(function(a, b) {
      var fieldA = a[field].toLowerCase(),
      fieldB = b[field].toLowerCase();
      if (fieldA === fieldB) {
        return 0;
      }
      let value;
      if (fieldA < fieldB) {
        value = -1;
      } else {
        value = 1;
      }
      if (order === 'desc') {
        value *= -1;
      }
      return value;
    }); 
    this.setState({
      empData,
      sortField: field,
      sortOrder: order
    });
  };

  filterEmployee = event => {
    const { value, name } = event.target;
    const empData = this.props.employees.filter(
      emp => emp[name].indexOf(value) >= 0         
    );
    this.setState({
      empData
    });
  };

  render() {
    const { empData } = this.state;   
  return (
    <div>
      <table>
        <tr>
          <th>
            Name
            <input name="name" type="button" onClick={this.sortEmployee} />
            <br />
            <input name="name" type="text" placeholder="Filter" onChange={this.filterEmployee} />
          </th>
          <th>
            Department
            <input name="department" type="button" onClick={this.sortEmployee} />
            <br />
            <input
              type="text"
              name="department"
              placeholder="Filter"
              onChange={this.filterEmployee}
            />
          </th>
          <th>
            Month
            <input name="month" type="button" onClick={this.sortEmployee} />
            <br />
            <input name="month" type="text" placeholder="Filter" onChange={this.filterEmployee} />
          </th>
        </tr>
      </table>
      <table>
      {empData && empData.map(emp =>
        <div key={emp.id}>
          <Emp
            emp={emp}
            updateEmployee={this.props.updateEmployee}
            deleteEmployee={this.props.deleteEmployee}
          />
        </div>
      )}
      </table>
      <div>
        Total Employee {empData && empData.length}
      </div>
    </div>
  );
};
}


const Details = ({ employees }) =>
  <div>
    <CreateEmployee />
    <ListEmployees employees={employees} />
  </div>

function getStores() {
  return [
    AppStore
  ];
}

function getState() {
  return {
    employees: AppStore.getState(),
  };
}

export default Container.createFunctional(Details, getStores, getState);
