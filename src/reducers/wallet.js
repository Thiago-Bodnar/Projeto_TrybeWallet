import {
  ADD_EXPENSE,
  RECEIVE_CURRENCIES,
  REMOVE_EXPENSE,
  REQUEST_CURRENCIES,
  SAVE_CHANGES,
  START_EDITING,
} from '../actions';

const INITIAL_STATE = {
  isEditing: false,
  editingId: '',
  isFetching: false,
  editingExchange: {},
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES: {
    return {
      ...state, isFetching: true,
    };
  }
  case RECEIVE_CURRENCIES: {
    return {
      ...state, currencies: action.currencies, isFetching: false,
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
      isEditing: !state.isEditing,
      editingId: action.id,
      editingExchange: action.exchangeRates,
    };
  }
  case SAVE_CHANGES: {
    const expense = { id: state.editingId, ...action.expense };
    return {
      ...state,
      isEditing: false,
      expenses: state.expenses
        .map((current) => (current.id === expense.id ? expense : current)),
    };
  }
  default:
    return state;
  }
}

export default wallet;
