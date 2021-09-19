// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  logged: false,
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case LOGIN:
    return {
      ...state,
      email: payload.email,
      logged: !payload.logged,
    };
  default:
    return state;
  }
};

export default userReducer;
