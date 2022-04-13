import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Header.module.css';

class Header extends Component {
    reduceTotal = () => {
      const { expenses } = this.props;
      const total = expenses.reduce((acc, curr) => {
        const { currency, exchangeRates, value } = curr;
        const { ask } = Object.values(exchangeRates)
          .find((exchange) => exchange.code === currency);
        acc += (ask * value);
        return acc;
      }, 0).toFixed(2);
      return total;
    };

    render() {
      const { userEmail } = this.props;
      const total = this.reduceTotal();
      return (
        <header className={ styles.header__container }>
          <p data-testid="email-field">{ userEmail }</p>
          <p data-testid="total-field">{ total }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      );
    }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Header);
