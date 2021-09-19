import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Label from '../components/Label';
import { login as userLogin } from '../actions';
import './login.css';
import wallet from '../images/wallet.png';

const initialState = {
  buttonDisabled: true,
  email: '',
  password: '',
  logged: false,
};
class Login extends React.Component {
  constructor() {
    super();
    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.redirectOnClick = this.redirectOnClick.bind(this);
    this.toggleLoginState = this.toggleLoginState.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
    this.enableButton();
  }

  enableButton() {
    const { email, password } = this.state;
    const passwordMinLength = 5;
    const emailIsValid = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
    const enable = emailIsValid.test(email) && password.length >= passwordMinLength;
    this.setState({ buttonDisabled: !enable });
  }

  toggleLoginState() {
    const { logged } = this.state;
    this.setState({ logged: !logged });
  }

  redirectOnClick() {
    this.toggleLoginState();
    const { email, logged } = this.state;
    const { history, login } = this.props;

    login(email, logged);

    history.push('/carteira');
  }

  render() {
    const { buttonDisabled, email, password } = this.state;
    return (
      <div className="App">
        <form className="lgn">
          <img src={ wallet } className="wallet" alt="Wallet-icon" />
          <div className="email-container row">
            <Label
              type="email"
              name="email"
              text="Email"
              className="clean"
              placeholder="email@example.com"
              dataTest="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </div>
          <div className="password-container row">
            <Label
              className="clean"
              text="Senha"
              onChange={ this.handleChange }
              value={ password }
              type="password"
              name="password"
              dataTest="password-input"
            />
          </div>
          <div className="buttons-container">
            <button
              type="button"
              disabled={ buttonDisabled }
              onClick={ this.redirectOnClick }
            >
              Entrar
            </button>
            <button
              type="button"
              disabled
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: propTypes.func,
  history: propTypes.objectOf(propTypes.func),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  login: (email, bool) => dispatch(userLogin(email, bool)),
});

export default connect(null, mapDispatchToProps)(Login);
