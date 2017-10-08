import { ReduceStore } from 'flux/utils';
import dispatcher from '../dispatcher';

class EmployeeStore extends ReduceStore {
  constructor() {
    super(dispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    let index;

    switch (action.type) {
      case 'GET_ALL_EMPLOYEE':
        return [...action.data];
      case 'CREATE_EMPLOYEE':
        return [...state, action.data];
      case 'REMOVE_EMPLOYEE':
        index = state.findIndex(employee => employee.id === action.id);
        state.splice(index, 1);
        return [...state];
      case 'UPDATE_EMPLOYEE':
        const employee = action.data;
        index = state.findIndex(employee => employee.id === action.id);
        state[index] = employee;
        return [...state];
      default:
        return state;
    }
  }
}

export default new EmployeeStore();
