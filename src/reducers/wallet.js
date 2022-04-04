import {
  ADD_EXPENSE,
  RECEIVE_CURRENCIES,
  REMOVE_EXPENSE,
  REQUEST_CURRENCIES,
  START_EDITING,
} from '../actions';

const INITIAL_STATE = {
  isEditing: false,
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
      isFetching: false,
    };
  }
  case REMOVE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  }
  case START_EDITING: {
    return {
      ...state,
      isEditing: true,
    };
  }
  default:
    return state;
  }
};

export default wallet;
