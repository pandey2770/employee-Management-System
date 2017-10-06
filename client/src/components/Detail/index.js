import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { withRouter } from 'react-router'
import { deleteEmployee, updateEmployee } from '../../actions';
import AppStore from '../../store';
import './styles.css';

class EmployeeDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      employee: undefined
    };
  }

  componentWillMount() {
    const { employees, match: {params: { id }}} = this.props;
    if (employees && id) {
      this.setCurrentEmployee(employees, id);
    }
  }

  componentWillReceiveProps(props) {
    const { employees, match: {params: { id }}} = props;
    if ((this.props.employees !== employees) && id) {
      this.setCurrentEmployee(employees, id);
    }
  }

  setCurrentEmployee(employees, id) {
    const employee = employees.find(emp => emp.id === id);
    this.setState({
      employee
    });
  }

  deleteEmployee = () => {
    const { id } = this.state.employee;
    deleteEmployee(id);
    this.props.history.push('/');
  };

  toggleEditEmployee = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing
    });
  };

  updateValue = event => {
    const { employee } = this.state;
    this.setState({
      employee: {
        ...employee,
        [`${event.target.name}`]: event.target.value
      }
    });
  };

  updateEmployee = () => {
    const { name, department, month, id } = this.state.employee;
    updateEmployee(name, department, month, id);
    this.toggleEditEmployee();
  };

  render() {
    const { employee: emp, editing } = this.state;
    if (editing) {
      return (
        <div>
          <input placeholder="Name" name="name" value={emp && emp.name} onChange={this.updateValue} />
          <input placeholder="department" name="department" value={emp && emp.department} onChange={this.updateValue} />
          <input placeholder="month" name="month" value={emp && emp.month} onChange={this.updateValue} />
          <input type="button" value="Save" onClick={this.updateEmployee} />
          <input type="button" value="Cancel" onClick={this.toggleEditEmployee} />
        </div>
      );
    }
    return (
      <div>
        <div className="center-content">
          <h1>Details page</h1>
          {emp && emp.name}
          {emp && emp.department}
          {emp && emp.month}
        </div>
        <input type='button' value='delete' onClick={this.deleteEmployee} />
        <input type="button" value="Edit" onClick={this.toggleEditEmployee} />
      </div>  
    );
  }
}

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

export default  Container.createFunctional(withRouter(EmployeeDetail), getStores, getState);
