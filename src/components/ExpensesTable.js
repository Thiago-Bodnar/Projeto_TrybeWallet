import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpense, startEditing } from '../actions';
import styles from './ExpensesTable.module.css';

class ExpensesTable extends Component {
  convertData = () => {
    const { expenses } = this.props;
    const convertedArray = expenses.map((expense) => {
      const {
        id,
        description,
        tag,
        method,
        value,
        exchangeRates,
        currency,
      } = expense;
      const { ask, name } = Object.values(expense.exchangeRates)
        .find((exchange) => exchange.code === currency);
      const fixedValue = (ask * value).toFixed(2);
      return {
        id,
        description,
        tag,
        method,
        ask: (+ask).toFixed(2),
        value: (+value).toFixed(2),
        currency: name,
        fixedValue,
        defaultCurrency: 'Real',
        exchangeRates,
      };
    });
    return convertedArray;
  };

  render() {
    const convertedExpenses = this.convertData();
    const { deleteExpense, editing } = this.props;
    return (
      <div className={ `${styles.table__container} table-responsive` }>
        <table className="table table-hover">
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

            {
              convertedExpenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ expense.value }</td>
                  <td>{ expense.currency }</td>
                  <td>{ expense.ask }</td>
                  <td>{ expense.fixedValue }</td>
                  <td>{ expense.defaultCurrency }</td>
                  <td>
                    <div className={ `${styles.buttons} btn-group btn-group-sm` }>
                      <button
                        type="button"
                        className="btn btn-warning"
                        data-testid="edit-btn"
                        onClick={ () => editing(expense.id, expense.exchangeRates) }
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-testid="delete-btn"
                        onClick={ () => deleteExpense(expense.id) }
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(removeExpense(id)),
  editing: (id, exchangeRates) => dispatch(startEditing(id, exchangeRates)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editing: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
