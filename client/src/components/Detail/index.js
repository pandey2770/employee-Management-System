import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { formatDate } from '../../utils';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { deleteEmployee, updateEmployee } from '../../actions';
import EmployeeStore from '../../store/employee';
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
    const { name, department, phone, address , dob, doj, id } = this.state.employee;
    updateEmployee(name, department, phone, address , dob, doj, id);
    this.toggleEditEmployee();
  };

  render() {
    const { employee: emp, editing } = this.state;
    if (editing) {
      return (
        <div>
          <input placeholder="Name" name="name" value={emp && emp.name} onChange={this.updateValue} />
          <input placeholder="department" name="department" value={emp && emp.department} onChange={this.updateValue} />
          <input placeholder="phone" name="phone" value={emp && emp.phone} onChange={this.updateValue} />
          <input placeholder="address" name="address" value={emp && emp.address} onChange={this.updateValue} />
          <input type="date" placeholder="dob" name="dob" value={emp && formatDate(emp.dob)} onChange={this.updateValue} />
          <input type="date" placeholder="doj" name="doj" value={emp && formatDate(emp.doj)} onChange={this.updateValue} />
        </div>
      );          
    }
    return (
      <div>
        <div>
          <h1>Preview page</h1>
          <div className='department'>{emp && emp.department} --</div>
          <div className='flex'>
            <div>
              <img src={emp && emp.avatar} className='details_photo'/>
            </div>
            <div>
              <div>{emp && emp.name} --</div>
              <div>{emp && emp.phone} --</div>
              <div>{emp && emp.address} --</div>
              <div>{emp && formatDate(emp.dob)} --</div>
              <div>{emp && formatDate(emp.doj)}</div>
            </div>
          </div>
        </div>
        <Link to={`/`}><input type='button' value='Go To List Page' /></Link>
        <input type='button' value='delete' onClick={this.deleteEmployee} />
        <input type="button" value="Edit" onClick={this.toggleEditEmployee} />
      </div>  
    );
  }
}

function getStores() {
  return [
    EmployeeStore
  ];
}

function getState() {
  return {
    employees: EmployeeStore.getState(),
  };
}

export default  Container.createFunctional(withRouter(EmployeeDetail), getStores, getState);
