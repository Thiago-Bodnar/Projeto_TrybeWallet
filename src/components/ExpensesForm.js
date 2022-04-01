import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense } from '../actions';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: '',
      descriptionInput: '',
      currencieSelect: 'USD',
      methodSelect: 'Dinheiro',
      typeSelect: 'Alimentação',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  handleClick = () => {
    // const data = this.state;
    const { setExpenseToState, expenses } = this.props;
    setExpenseToState(this.state);
    console.log(expenses);
  };

  render() {
    const {
      valueInput,
      descriptionInput,
      currencieSelect,
      methodSelect,
      typeSelect,
    } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor
          <input
            type="number"
            id="value-input"
            data-testid="value-input"
            name="valueInput"
            value={ valueInput }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição
          <input
            id="description-input"
            data-testid="description-input"
            name="descriptionInput"
            value={ descriptionInput }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currencie-select">
          Moeda
          <select
            id="currencie-select"
            name="currencieSelect"
            value={ currencieSelect }
            onChange={ this.handleChange }
          >
            {
              currencies.map((currencie, index) => (
                <option value={ currencie } key={ index }>
                  { currencie }
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method-select">
          Método de Pagamento
          <select
            data-testid="method-input"
            id="method-select"
            name="methodSelect"
            value={ methodSelect }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="type-select">
          Tipo
          <select
            id="type-select"
            name="typeSelect"
            value={ typeSelect }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleClick }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setExpenseToState: (expense) => dispatch(addExpense(expense)),
});

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  setExpenseToState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
