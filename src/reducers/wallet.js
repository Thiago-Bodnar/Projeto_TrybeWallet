const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};
const ADD_EXPENSE_IN_CURRENCIE = 'ADD_EXPENSE_IN_CURRENCIE';

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE_IN_CURRENCIE: {
    return {
      currencies: action.currencies,
      expenses: action.expenses,
    };
  }
  default:
    return state;
  }
};

export default wallet;
