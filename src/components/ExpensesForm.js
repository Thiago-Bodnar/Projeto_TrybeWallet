import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveChanges, saveExpense } from '../actions';
import styles from './ExpensesForm.module.css';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  handleClick = () => {
    const { setExpenseToState } = this.props;
    setExpenseToState(this.state);
    this.setState({
      value: '',
      description: '',
    });
  };

  handleEdit = () => {
    const { setEditedExpense, editingExchange } = this.props;
    setEditedExpense(this.state, editingExchange);
    this.setState({
      value: '',
      description: '',
    });
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { currencies, isEditing } = this.props;
    return (
      <form className={ `row ${styles.form__container}` }>
        <div className="col-auto ">
          <div className="input-group">

            <label htmlFor="value-input">
              Valor
              <input
                type="number"
                className="form-control"
                id="value-input"
                data-testid="value-input"
                name="value"
                value={ value }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="currencie-select">
              Moeda
              <select
                className="form-control"
                id="currencie-select"
                data-testid="currency-input"
                name="currency"
                value={ currency }
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
          </div>
        </div>
        <div className="col-auto">
          <label htmlFor="description-input">
            Descrição
            <input
              className="form-control"
              id="description-input"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div className="col-auto" />
        <div className="col-auto">
          <label htmlFor="method-select">
            Método de Pagamento
            <select
              data-testid="method-input"
              className="form-control"
              id="method-select"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
        </div>
        <div className="col-auto">
          <label htmlFor="type-select">
            Tipo
            <select
              className="form-control"
              id="type-select"
              name="tag"
              value={ tag }
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
        </div>
        <div className="col-auto">
          <button
            className="btn btn-primary"
            type="button"
            onClick={ isEditing ? this.handleEdit : this.handleClick }
          >
            { isEditing ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
  editingExchange: state.wallet.editingExchange,
});

const mapDispatchToProps = (dispatch) => ({
  setExpenseToState: (expense) => dispatch(saveExpense(expense)),
  setEditedExpense: (newExpense, exchangeRates) => dispatch(
    saveChanges(newExpense, exchangeRates),
  ),
});

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  setExpenseToState: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  setEditedExpense: PropTypes.func.isRequired,
  editingExchange: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
