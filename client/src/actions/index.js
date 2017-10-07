import axios from 'axios';
import dispatcher from '../dispatcher';

export const getEmployees = () => {
  axios.get('/api/employee').then(({ data }) => {
    dispatcher.dispatch({
      type: 'GET_ALL_EMPLOYEE',
      data
    });
  });
};

export const createEmployee = (name, department, phone, address , dob, doj, history) => {
  axios
    .post('/api/employee/', { employee: { name, department, phone, address , dob, doj } })
    .then(({ data }) => {
      dispatcher.dispatch({
        type: 'CREATE_EMPLOYEE',
        data: { name, department, phone, address , dob, doj, id: data.id }
      });
      history.push(`/employee/${data.id}`)
    }, () => {
      console.log('create employee failed 😣');
    });
};

export const deleteEmployee = id => {
  axios.delete(`/api/employee/${id}`).then(() => {
    dispatcher.dispatch({
      type: 'REMOVE_EMPLOYEE',
      id
    });
  }, () => {
    console.log('delete employee failed 😣');
  });
};

export const updateEmployee = (name, department, phone, address , dob, doj, id) => {
  axios.put(`/api/employee/${id}`, { employee: { name, department, phone, address , dob, doj } })
    .then(() => {
      dispatcher.dispatch({
        type: 'UPDATE_EMPLOYEE',
        id,
        data: { name, department, phone, address , dob, doj, id }
      });
    }, () => {
      console.log('update employee failed 😣');
    });
};
