import React, { Component} from 'react';
import {Container} from 'flux/utils';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import { deleteEmployee, updateEmployee } from '../../actions';
import AppStore from '../../store';
import './styles.css';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      name: '',
      department: '',
      month: '',
    };
  }
  componentWillMount() {
    const { employees, match: {params: { id }}} = this.props;
    if (employees && id) {
      this.setCurrentEmployee(employees, id);
    }
  }

  deleteEmployee = () => {
    const { id } = this.state.employee;
    deleteEmployee(id);
  };

  componentWillReceiveProps(props) {
    console.log('into componentWillReceiveProps')
    const { employees, match: {params: { id }}} = props;
    if ((this.props.employees !== employees) && id && !this.state.employee) {
      this.setCurrentEmployee(employees, id);
    }
  }

  setCurrentEmployee(employees, id) {
    const employee = employees.find(emp => emp.id === id);
    this.setState({
      employee
    });
  }
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
    const { name, department, month } = this.state;
    const { id } = this.state.employee;
    updateEmployee(name, department, month, id);    
    this.toggleEditEmployee();
  };

  render() {
    const { employee } = this.state;
    const { editing } = this.state;
    if (editing) {
      const { name, department, month } = this.state.employee;
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
    return (
      <div>
        <div className="center">
          <h1>Details page</h1>
          {employee && employee.name}
          {employee && employee.department}
          {employee && employee.month}
        </div>
        <Link to={`/emp`}>
        <input type='button' value='delete' onClick={this.deleteEmployee} /></Link>
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

export default  Container.createFunctional(withRouter(Detail), getStores, getState);
