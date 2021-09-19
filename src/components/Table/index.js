import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { AiFillCloseCircle } from 'react-icons/ai';

import {
  removeItem as removeItemAction,
} from '../../actions';

import './index.css';

class Table extends Component {
  constructor() {
    super();

    this.tableExpense = this.tableExpense.bind(this);
    this.setExpenseToEdit = this.setExpenseToEdit.bind(this);
  }

  setExpenseToEdit(editId) {
    const { expenses, editItem } = this.props;
    const editableObject = expenses.find(({ id }) => id === editId);
    editItem(editableObject);
  }

  tableExpense() {
    const { expenses, removeItem } = this.props;
    return expenses.map((
      { value, description, currency, method, tag, id, exchangeRates }, index,
    ) => (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ (exchangeRates[currency].name.split('/')[0]) }</td>
        <td>{ (parseFloat(exchangeRates[currency].ask)).toFixed(2) }</td>
        <td>
          {
            (parseFloat(value) * parseFloat(exchangeRates[currency].ask)).toFixed(2)
          }
        </td>
        <td>Real</td>
        <td className="button-container">
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => removeItem(index) }
          >
            <AiFillCloseCircle />
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { this.tableExpense() }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (index) => dispatch(removeItemAction(index)),
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object),
  removeItem: propTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
