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

export const createEmployee = (name, department, month) => {
  axios
    .post('/api/employee/', { employee: { name, department, month } })
    .then(({ data }) => {
      dispatcher.dispatch({
        type: 'CREATE_EMPLOYEE',
        data: { name, department, month, id: data.id }
      });
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

export const updateEmployee = (name, department, month, id) => {
  axios.put(`/api/employee/${id}`, { employee: { name, department, month } })
    .then(() => {
      dispatcher.dispatch({
        type: 'UPDATE_EMPLOYEE',
        id,
        data: { name, department, month, id }
      });
    }, () => {
      console.log('update employee failed 😣');
    });
};
