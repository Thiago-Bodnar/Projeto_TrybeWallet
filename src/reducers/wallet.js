import { ADD_EXPENSE, RECEIVE_CURRENCIES, REQUEST_CURRENCIES } from '../actions';

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
  case ADD_EXPENSE: {
    const expensesLength = state.expenses.length;
    const expense = {
      id: !expensesLength ? 0 : expensesLength,
      ...action.expense,
    };
    return {
      ...state,
      expenses: [...state.expenses, expense],
    };
  }
  default:
    return state;
  }
};

export default wallet;
