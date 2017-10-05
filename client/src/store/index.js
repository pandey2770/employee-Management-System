import { ReduceStore } from 'flux/utils';
import dispatcher from '../dispatcher';

class AppStore extends ReduceStore {
  constructor() {
    super(dispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch (action.type) {
      case 'GET_ALL_EMPLOYEE':
        return state = action.data;
      default:
        return state;
    }
  }
}

export default new AppStore();
