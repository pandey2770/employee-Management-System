import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class CreateEmployee extends Component {
  state = {
    name: '',
    department: ''
  }

  updateValue = (event) => {
    this.setState({
      [`${event.target.name}`]: event.target.value
    });
  }

  createEmployee = () => {
    const { name, department } = this.state;
    this.props.createEmployee(name, department);
  }

  render() {
    const { name, department } = this.state;
    return (
      <div>
        <input type='text' placeholder='Name' name="name" value={name} onChange={this.updateValue}/>
        <input type='text' placeholder='department' name="department" value={department} onChange={this.updateValue}/>
        <input type='button' value="Save" onClick={this.createEmployee}/>
      </div>
    )
  }
}

class Emp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      name: props.emp.name,
      department: props.emp.department
    }
  }

  toggleEditEmployee = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing
    });
  }

  updateValue = (event) => {
    this.setState({
      [`${event.target.name}`]: event.target.value
    });
  }

  deleteEmployee = () => {
    const { deleteEmployee, emp: { id } } = this.props;
    deleteEmployee(id);
  }

  updateEmployee = () => {
    const { updateEmployee, emp } = this.props;
    const { name, department } = this.state;
    updateEmployee(emp.id, name, department);
    this.toggleEditEmployee();
  }
 
  render() {
    const { editing } = this.state;
    if (editing) {
      const { name, department } = this.state;
      return (
        <div>
          <input type='text' placeholder='Name' name="name" value={name} onChange={this.updateValue}/>
          <input type='text' placeholder='department' name="department" value={department} onChange={this.updateValue}/>
          <input type='button' value="Save" onClick={this.updateEmployee}/>
          <input type='button' value="Cancel" onClick={this.toggleEditEmployee}/>
        </div>
      )
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
          </tr>
        </table>
        <input type='button' value='Edit' onClick={this.toggleEditEmployee}/>
        <input type='button' value='Delete' onClick={this.deleteEmployee}/>
      </div>
    )
  }
}

const ListEmployee = ({ empData, updateEmployee,
                      deleteEmployee, sortEmployee, 
                      sortDepartment,filterEmployee, 
                      filterDepartment }) => {
  return (
    <div>
      <table>
        <tr>
          <th>
            Name     
            <input name="name" type='button' onClick={sortEmployee}/><br/>
            <input type='text' onChange={filterEmployee} />
          </th>
          <th>
            Department
            <input name="department" type='button' onClick={sortDepartment}/><br/>
            <input type='text' onChange={filterDepartment} />
          </th>
        </tr>
      </table>
      {empData.map(emp => (
        <div key={emp.id}>
          <Emp emp={emp} updateEmployee={updateEmployee} deleteEmployee={deleteEmployee} />
        </div>
      ))}
      <div>
        Total Employee {empData.length}
      </div>
    </div>
  )
}

class Employee extends Component {
  state = {
    userData: [],
    sortField: undefined,
    sortOrder: 'none',
  }

  componentWillMount() {
    this.listEmployees();
  }
  
  listEmployees = () => {
    const that = this;
    axios.get(`api/employee`)
      .then(({ data }) => {
        this.backupData = data;
        that.setState({
          userData: data
        });
        console.log(data.length)
    }); 
  }

  deleteEmployee = (id) =>{
    axios.delete(`/api/employee/${id}`);
    const { userData } = this.state;
    const deletedEmpIndex = userData.findIndex(emp => emp.id === id);
    userData.splice(deletedEmpIndex, 1);
    this.setState({
      userData
    });
  };

  createEmployee = (name, department) => {
    axios.post(
      '/api/employee',
      {employee: {name, department}}
    );
  };

  updateEmployee = (id, name, department) => {
    axios.put(
      `/api/employee/${id}`,
      {employee: {name, department, id}}
    );
  }
  filterEmployee = (event) => {
    const { value } = event.target;
    const userData = this.backupData.filter(emp => emp.name.indexOf(value) >= 0);
    this.setState({
      userData
    });
  }
  filterDepartment =(event) => {
    const { value } = event.target;
    const userData = this.backupData.filter(emp => emp.department.indexOf(value) >= 0);
    this.setState({
      userData
    });
  }
  
  sortDepartment = (event) => {
    const { userData, sortField, sortOrder } = this.state; 
    const { department: field } = event.target;
    let order = 'asc';
    if(field === sortField){
      order = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    userData.sort(function(a, b){
      var departmentA=a.department.toLowerCase(), departmentB=b.department.toLowerCase();
      if (departmentA === departmentB) {
        return 0;
      }
      console.log('order', order)
      let value;
      if (departmentA < departmentB) {
        value =  -1 
      } else {
      value = 1
      }
      if (order === 'desc') {
        value *= -1;
      }
      return value
    })
    this.setState({
      userData,
      sortField: field,
      sortOrder: order,
    })
  }
  sortEmployee = (event) => {
    const { userData, sortField, sortOrder } = this.state; 
    const { name: field } = event.target;
    let order = 'asc';
    if(field === sortField){
      order = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    userData.sort(function(a, b){
      var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
      if (nameA === nameB) {
        return 0;
      }
      console.log('order', order)
      let value;
      if (nameA < nameB) {
        value =  -1 
      } else {
      value = 1
      }
      if (order === 'desc') {
        value *= -1;
      }
      return value
    })
    this.setState({
      userData,
      sortField: field,
      sortOrder: order,
    })
  }

  render() { 
    const { userData } = this.state;  
    return (
      <div className='center'>
        <h1>Employee Management System</h1>
        <CreateEmployee createEmployee={this.createEmployee} />
        <ListEmployee
          empData={userData}
          updateEmployee={this.updateEmployee}
          deleteEmployee={this.deleteEmployee}
          sortEmployee={this.sortEmployee}
          sortDepartment ={this.sortDepartment}
          filterEmployee ={this.filterEmployee}
          filterDepartment={this.filterDepartment}
        />
      </div>
    );
  };
}

export default Employee;
