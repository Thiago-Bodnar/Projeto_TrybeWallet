// Coloque aqui suas actions
import { USER_LOGIN } from '../reducers/user';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const setEmail = (userInfo) => ({
  type: USER_LOGIN, userInfo,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES, currencies,
});

export const addExpense = (expense, currenciesRates) => ({
  type: ADD_EXPENSE, expense: { ...expense, currenciesRates },
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();
  dispatch(receiveCurrencies(Object.keys(currencies)
    .filter((currencie) => currencie !== 'USDT')));
};

export const saveExpense = (expense) => async (dispatch) => {
  dispatch(requestCurrencies());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesRates = await response.json();
  dispatch(addExpense(expense, currenciesRates));
};
