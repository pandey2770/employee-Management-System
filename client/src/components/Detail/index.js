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
          <h1 className='heading'>Preview page</h1>
          <input className='name-heading name-heading2' placeholder="Name" name="name" value={emp && emp.name} onChange={this.updateValue} />
          <div className="line-wrapper">
            <div className="line"></div>
          </div>      
          <div className='flex'>
            <div>
              <img src={emp && emp.avatar} className='details_photo'/>
            </div>
            <div className='department'>
              <div><input className='heading-sub' placeholder="department" name="department" value={emp && emp.department} onChange={this.updateValue} /></div>
              <div><input className='heading-sub' placeholder="phone" name="phone" value={emp && emp.phone} onChange={this.updateValue} /></div>
              <div><input className='heading-sub' placeholder="address" name="address" value={emp && emp.address} onChange={this.updateValue} /></div>
              <div><input className='heading-sub' type='date' placeholder="dob" name="dob" value={emp && (emp.dob)} onChange={this.updateValue} /></div>
              <div><input className='heading-sub' type='date' placeholder="doj" name="doj" value={emp && (emp.doj)} onChange={this.updateValue} /></div>
              <div className='save-button'>
                <input type="button" value="Save" onClick={this.updateEmployee} />
                <input type="button" value="Cancel" onClick={this.toggleEditEmployee} />
              </div>
            </div>
          </div>
        </div>
      );          
    }
    return (
      <div>
        <div>
          <h1 className='heading'>Preview page</h1>
          <div className='name-heading'>Name -- {emp && emp.name}</div>
          <div className='delete-button'> 
            <input type='button' value='delete' onClick={this.deleteEmployee} />
            <input type="button" value="Edit" onClick={this.toggleEditEmployee} /> 
          </div>
          <div className="line-wrapper">
            <div className="line"></div>
          </div>      
          <div className='flex'>
            <div>
              <img src={emp && emp.avatar} className='details_photo'/>
            </div>
            <div className='department'>
              <h3>Department -- {emp && emp.department}</h3>
              <div className='heading-sub'>Phone no. -- {emp && emp.phone}</div>
              <div className='heading-sub'>Address -- {emp && emp.address}</div>
              <div className='heading-sub'>Date of Birth -- {emp && formatDate(emp.dob)}</div>
              <div className='heading-sub'>Date of Join -- {emp && formatDate(emp.doj)}</div>
            </div>
          </div>
        </div>
        <div className='listpage'>
          <Link to={`/`}><input type='button' value='Go To List Page' /></Link>
        </div>
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
