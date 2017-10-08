import { ReduceStore } from 'flux/utils';
import dispatcher from '../dispatcher';

class UserStore extends ReduceStore {
  constructor() {
    super(dispatcher);
  }

  getInitialState() {
    return null;
  }

  reduce(state, action) {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
      console.log('action.data', action.data)
        return action.data;
      case 'LOGOUT_SUCCESS':
        return null;
      case 'SET_USER':
        return action.data;
      default:
        return state;
    }
  }
}

export default new UserStore();
