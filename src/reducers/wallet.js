import { RECEIVE_CURRENCIES, REQUEST_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES: {
    return {
      ...state,
      isFetching: true,
    };
  }
  case RECEIVE_CURRENCIES: {
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  }
  default:
    return state;
  }
};

export default wallet;
