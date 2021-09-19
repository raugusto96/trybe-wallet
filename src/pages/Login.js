import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Label from '../components/Label';
import { login as userLogin } from '../redux/actions';
import './login.css';
import wallet from '../images/wallet.png';

const initialState = {
  validateEmail: false,
  validatePassword: false,
  email: '',
  password: '',
  logged: false,
};
class Login extends React.Component {
  constructor() {
    super();
    this.state = initialState;

    this.validatePassword = this.validatePassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.redirectOnClick = this.redirectOnClick.bind(this);
    this.toggleLoginState = this.toggleLoginState.bind(this);
  }

  validateEmail({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      const { email } = this.state;
      const emailIsValid = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
      const enable = emailIsValid.test(email);
      this.setState({ validateEmail: enable });
    });
  }

  validatePassword({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      const { password } = this.state;
      const passwordMinLength = 5;
      const enable = password.length > passwordMinLength;
      this.setState({ validatePassword: enable });
    });
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
    const { validateEmail, validatePassword, email, password } = this.state;
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
              onChange={ this.validateEmail }
            />
          </div>
          <div className="password-container row">
            <Label
              className="clean"
              text="Senha"
              onChange={ this.validatePassword }
              value={ password }
              type="password"
              name="password"
              dataTest="password-input"
            />
          </div>
          <div className="buttons-container">
            <button
              type="button"
              disabled={ !(validateEmail && validatePassword) }
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
