import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: '',
      descriptionInput: '',
      // currencieSelect: '',
      // methodSelect: '',
    };
  }

  render() {
    const { valueInput, descriptionInput } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor
          <input
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
          <select id="currencie-select" name="currencieSelect">
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
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="type-select">
          Tipo
          <select
            id="type-select"
            name="methodSelect"
            data-testid="tag-input"
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(ExpensesForm);
