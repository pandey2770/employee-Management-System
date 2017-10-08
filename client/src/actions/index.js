import axios from 'axios';
import dispatcher from '../dispatcher';

export const login = (username, password, history) => {
  axios.post('/api/login', {username, password}).then(({ data }) => {
    history.push('/');
    getEmployees();
    dispatcher.dispatch({
      type: 'LOGIN_SUCCESS',
      data
    });
  }, () => {
    console.log('login failed 😣');
  });
}

export const logout = ( history) => {
  axios.get('/api/logout').then(() => {
    history.push('/');
    dispatcher.dispatch({
      type: 'LOGOUT_SUCCESS',
    });
  });
}

export const getUser = () => {
  axios.get('/api/user').then(({ data }) => {
    getEmployees();
    dispatcher.dispatch({
      type: 'SET_USER',
      data
    });
  });
}

export const getEmployees = () => {
  axios.get('/api/employee').then(({ data }) => {
    dispatcher.dispatch({
      type: 'GET_ALL_EMPLOYEE',
      data
    });
  }, () => {
    console.log('get employee failed 😣');
  });
};

export const createEmployee = (employee, history) => {
  axios
    .post('/api/employee/', { employee })
    .then(({ data }) => {
      dispatcher.dispatch({
        type: 'CREATE_EMPLOYEE',
        data: { ...employee, id: data.id }
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
