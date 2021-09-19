// Coloque aqui suas actions

import fetchURL from '../../services';

export const LOGIN = 'LOGIN';

export const login = (email, logged) => ({
  type: LOGIN,
  payload: {
    email,
    logged,
  },
});

export const GET_CURRENCIES = 'GET_CURRENCIES';

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: {
    currencies,
  },
});

export const ADD_EXPENSES = 'ADD_EXPENSES';

export const saveExpenses = (expenses) => async (dispatch) => {
  const response = await fetchURL();
  delete response.USDT;
  expenses.exchangeRates = response;
  dispatch({
    type: ADD_EXPENSES,
    payload: {
      expenses,
    },
  });
};

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetchURL();
  delete response.USDT;
  dispatch(getCurrencies(response));
};

export const REMOVE_ITEM = 'REMOVE_ITEM';

export const removeItem = (index) => ({
  type: REMOVE_ITEM,
  payload: {
    index,
  },
});
