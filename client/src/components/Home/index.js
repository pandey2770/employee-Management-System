import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { Link } from 'react-router-dom';

import EmployeeStore from '../../store/employee';
import Employee from './employee';
import './styles.css';

class Home extends Component {
  static getStores() {
    return [
      EmployeeStore
    ];
  }
  
  static calculateState() {
    return {
      employees: EmployeeStore.getState(),
      empData: EmployeeStore.getState(),
    };
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
    const empData = this.state.employees.filter(
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
              <th>phone<input name="phone" type="button" onClick={this.sortEmployee} /></th>
              <th>Address<input name="Address" type="button" onClick={this.sortEmployee} /></th>
              <th>dob<input name="dob" type="button" onClick={this.sortEmployee} /></th>
              <th>doj<input name="doj" type="button" onClick={this.sortEmployee} /></th>
              <th />
            </tr>
            <tr>
              <td><input name="name"  placeholder="Filter" onChange={this.filterEmployee} /></td>
              <td><input name="department" placeholder="Filter" onChange={this.filterEmployee} /></td>
              <td><input name="phone" placeholder="Filter" onChange={this.filterEmployee} /></td>
              <td><input name="Address" placeholder="Filter" onChange={this.filterEmployee} /></td>
              <td><input name="dob" placeholder="Filter" onChange={this.filterEmployee} /></td>
              <td><input name="doj" placeholder="Filter" onChange={this.filterEmployee} /></td>
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
          <Link to={`/create`}><input type='button' value='Go to Create Employee' /></Link>
        </div>
      </div>
    );
  };
}


export default Container.create(Home);
