import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { FaUserCircle } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';
import { MdExitToApp } from 'react-icons/md';

import walletImg from '../../images/wallet.png';

class Header extends Component {
  constructor() {
    super();

    this.sum = this.sum.bind(this);
    this.renderExitButton = this.renderExitButton.bind(this);
  }

  sum() {
    const { expenses } = this.props;
    let INITIAL_VALUE = 0;

    expenses.forEach(({ value, currency, exchangeRates }) => {
      INITIAL_VALUE += parseFloat(value) * parseFloat(exchangeRates[currency].ask);
    });

    return INITIAL_VALUE;
  }

  renderExitButton() {
    const { history } = this.props;
    return (
      <button
        type="button"
        className="exit-button"
        onClick={ () => {
          history.push('/');
        } }
      >
        <MdExitToApp className="exit-icon" />
      </button>
    );
  }

  render() {
    const { loggedUserEmail } = this.props;
    return (
      <main>
        <header className="header">
          <div className="title-container">
            <img src={ walletImg } className="wallet" alt="Wallet-icon" />
            <h2 className="header-title">
              Tr
              <span>y</span>
              be Wallet
            </h2>
          </div>
          <div className="wallet-container">
            <div className="wallet-email">
              <FaUserCircle />
              <p data-testid="email-field" className="user-email">{ loggedUserEmail }</p>
            </div>
            <div className="wallet-funds">
              <GiTwoCoins className="funds-icon" />
              R$:
              {' '}
              <span
                data-testid="total-field"
                className="user-funds"
              >
                { this.sum().toFixed(2) }
              </span>
              {' '}
              <span data-testid="header-currency-field">BRL</span>
              { this.renderExitButton() }
            </div>
          </div>
        </header>
      </main>
    );
  }
}

Header.propTypes = {
  history: propTypes.objectOf(propTypes.func),
  loggedUserEmail: propTypes.func,
}.isRequired;

const mapStateToProps = ({ user, wallet }) => ({
  loggedUserEmail: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
