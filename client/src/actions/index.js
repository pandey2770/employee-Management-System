import axios from 'axios';
import dispatcher from '../dispatcher';

export const getEmployees = () => {
  axios.get('api/employee').then(({ data }) => {
    dispatcher.dispatch({
      type: 'GET_ALL_EMPLOYEE',
      data
    });
  });
}