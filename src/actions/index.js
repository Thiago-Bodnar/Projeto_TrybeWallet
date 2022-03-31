// Coloque aqui suas actions
import { USER_LOGIN } from '../reducers/user';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';

export const setEmail = (userInfo) => ({
  type: USER_LOGIN, userInfo,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES, currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();
  dispatch(receiveCurrencies(currencies));
};
