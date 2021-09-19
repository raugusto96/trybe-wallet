import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import Table from '../components/Table';

import './wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      seconds: 3,
    };
    this.intervalToRedirect = this.intervalToRedirect.bind(this);
  }

  componentDidMount() {
    this.intervalToRedirect();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  intervalToRedirect() {
    const ONE_SECOND = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  render() {
    const { history, logged } = this.props;
    const { seconds } = this.state;
    const ZERO = 0;

    if (logged) {
      return (
        <div className="wallet-main-container">
          <Header history={ history } />
          <ExpenseForm />
          <Table />
        </div>
      );
    }

    return (
      <div className="wallet-main-container-logout">
        <div className="logout">
          <p>
            Login não efetuado!
          </p>
          <span>
            Você será redirecionado em:
            {' '}
            <span>
              { seconds }
            </span>
          </span>

          { seconds === ZERO && <Redirect to="/" /> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  logged: user.logged,
});

Wallet.propTypes = {
  history: propTypes.objectOf(propTypes.func),
  logged: propTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
