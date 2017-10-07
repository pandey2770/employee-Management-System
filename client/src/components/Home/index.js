import React, { Component } from 'react';
import { Container } from 'flux/utils';
import AppStore from '../../store';
import Employee from './employee';
import { Link } from 'react-router-dom';
import './styles.css';

class ListEmployees extends Component {
  constructor(props) {
    super(props)
    this.state = {
      empData: props.employees
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      empData: props.employees
    });
  }

  sortEmployee = event => {
    const { empData } = this.state;
    const { name: sortField } = event.target;
    let sortOrder = 'asc';
    if (sortField === this.state.sortField) {
      sortOrder = this.state.sortOrder === 'asc' ? 'desc' : 'asc';
    }

    empData.sort(function(emp1, emp2) {
      const field1 = emp1[sortField].toLowerCase();
      const field2 = emp2[sortField].toLowerCase();
      if (field1 === field2) {
        return 0;
      }
      let value = field1 < field2 ? -1 : 1;
      if (sortOrder === 'desc') {
        value *= -1;
      }
      return value;
    });

    this.setState({
      empData,
      sortField,
      sortOrder
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
          <tbody>
            <tr>
              <th>Name<input name="name" type="button" onClick={this.sortEmployee} /></th>
              <th>Department<input name="department" type="button" onClick={this.sortEmployee} /></th>
              <th>Month<input name="month" type="button" onClick={this.sortEmployee} /></th>
              <th />
            </tr>
            <tr>
              <td><input name="name" type="text" placeholder="Filter" onChange={this.filterEmployee} /></td>
              <td><input name="department" placeholder="Filter" onChange={this.filterEmployee} /></td>
              <td><input name="month" type="text" placeholder="Filter" onChange={this.filterEmployee} /></td>
              <td />
            </tr>
            {empData && empData.map(emp =>
              <Employee
                key={emp.id}
                emp={emp}
                updateEmployee={this.props.updateEmployee}
                deleteEmployee={this.props.deleteEmployee}
              />
            )}
          </tbody>
        </table>
        <div>
          Total Employee {empData && empData.length}
          <Link to={`/show`}><input type='button' value='Go to Create Employee' /></Link>
        </div>
      </div>
    );
  };
}


const Home = ({ employees }) =>
  <div>
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

export default Container.createFunctional(Home, getStores, getState);
