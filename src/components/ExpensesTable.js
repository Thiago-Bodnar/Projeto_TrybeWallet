import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      };
    });
    return convertedArray;
  };

  render() {
    const convertedExpenses = this.convertData();
    return (
      <table>
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
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, null)(ExpensesTable);
