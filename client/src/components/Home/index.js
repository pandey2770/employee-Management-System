import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
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
    this.props.createEmployee(name, department, month);
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
    const { deleteEmployee, emp: { id } } = this.props;
    deleteEmployee(id);
  };

  updateEmployee = () => {
    const { updateEmployee, emp } = this.props;
    const { name, department, month } = this.state;
    updateEmployee(emp.id, name, department, month);
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
      <div>
        <table>
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
          </tr>
        </table>
        <input type="button" value="Edit" onClick={this.toggleEditEmployee} />
        <input type="button" value="Delete" onClick={this.deleteEmployee} />
      </div>
    );
  }
}

const ListEmployee = ({
  empData,
  updateEmployee,
  deleteEmployee,
  sortEmployee,
  sortDepartment,
  filterEmployee,
  filterDepartment,
  sortMonth,
  filterMonth
}) => {
  return (
    <div>
      <table>
        <tr>
          <th>
            Name
            <input name="name" type="button" onClick={sortEmployee} />
            <br />
            <input type="text" placeholder="Filter" onChange={filterEmployee} />
          </th>
          <th>
            Department
            <input name="department" type="button" onClick={sortDepartment} />
            <br />
            <input
              type="text"
              placeholder="Filter"
              onChange={filterDepartment}
            />
          </th>
          <th>
            Month
            <input name="month" type="button" onClick={sortMonth} />
            <br />
            <input type="text" placeholder="Filter" onChange={filterMonth} />
          </th>
        </tr>
      </table>
      {empData.map(emp =>
        <div key={emp.id}>
          <Emp
            emp={emp}
            updateEmployee={updateEmployee}
            deleteEmployee={deleteEmployee}
          />
        </div>
      )}
      <div>
        Total Employee {empData.length}
      </div>
    </div>
  );
};

class Employee extends Component {
  state = {
    userData: [],
    sortField: undefined,
    sortOrder: 'none'
  };

  componentWillMount() {
    this.listEmployees();
  }

  listEmployees = () => {
    const that = this;
    axios.get(`api/employee`).then(({ data }) => {
      this.backupData = data;
      that.setState({
        userData: data
      });
    });
  };

  deleteEmployee = id => {
    axios.delete(`/api/employee/${id}`);
    const { userData } = this.state;
    const deletedEmpIndex = userData.findIndex(emp => emp.id === id);
    userData.splice(deletedEmpIndex, 1);
    this.setState({
      userData
    });
  };

  createEmployee = (name, department, month) => {
    axios.post('/api/employee', { employee: { name, department, month } });
  };

  updateEmployee = (id, name, department, month) => {
    axios.put(`/api/employee/${id}`, {
      employee: { name, department, id, month }
    });
  };
  filterEmployee = event => {
    const { value } = event.target;
    const userData = this.backupData.filter(
      emp => emp.name.indexOf(value) >= 0
    );
    this.setState({
      userData
    });
  };
  filterDepartment = event => {
    const { value } = event.target;
    const userData = this.backupData.filter(
      emp => emp.department.indexOf(value) >= 0
    );
    this.setState({
      userData
    });
  };
  filterMonth = event => {
    console.log('asda');
    const { value } = event.target;
    const userData = this.backupData.filter(
      emp => emp.month.indexOf(value) >= 0
    );
    this.setState({
      userData
    });
  };
  sortMonth = event => {
    const { userData, sortField, sortOrder } = this.state;
    const { month: field } = event.target;
    let order = 'asc';
    if (field === sortField) {
      order = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    userData.sort(function(a, b) {
      var monthA = a.month.toLowerCase(),
        monthB = b.month.toLowerCase();
      if (monthA === monthB) {
        return 0;
      }
      let value;
      if (monthA < monthB) {
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
      userData,
      sortField: field,
      sortOrder: order
    });
  };
  sortDepartment = event => {
    const { userData, sortField, sortOrder } = this.state;
    const { department: field } = event.target;
    let order = 'asc';
    if (field === sortField) {
      order = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    userData.sort(function(a, b) {
      var departmentA = a.department.toLowerCase(),
        departmentB = b.department.toLowerCase();
      if (departmentA === departmentB) {
        return 0;
      }
      let value;
      if (departmentA < departmentB) {
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
      userData,
      sortField: field,
      sortOrder: order
    });
  };
  sortEmployee = event => {
    const { userData, sortField, sortOrder } = this.state;
    const { name: field } = event.target;
    let order = 'asc';
    if (field === sortField) {
      order = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    userData.sort(function(a, b) {
      var nameA = a.name.toLowerCase(),
        nameB = b.name.toLowerCase();
      if (nameA === nameB) {
        return 0;
      }
      let value;
      if (nameA < nameB) {
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
      userData,
      sortField: field,
      sortOrder: order
    });
  };

  render() {
    const { userData } = this.state;
    return (
      <div className="center">
        <CreateEmployee createEmployee={this.createEmployee} />
        <ListEmployee
          empData={userData}
          updateEmployee={this.updateEmployee}
          deleteEmployee={this.deleteEmployee}
          sortEmployee={this.sortEmployee}
          sortDepartment={this.sortDepartment}
          filterEmployee={this.filterEmployee}
          filterDepartment={this.filterDepartment}
          sortMonth={this.sortMonth}
          filterMonth={this.filterMonth}
        />
      </div>
    );
  }
}

export default Employee;
