import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import login from '../images/login.svg';
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
        <header
          className={ `d-flex
        ${styles.header__container}
        flex-wrap
        py-3
        mb-4
        border-bottom` }
        >
          <a
            href="/"
            className="d-flex
          align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
          >
            <img
              src={ login }
              alt="person looking at a expense sheet"
              className="bi me-2"
            />
            <h2>TrybeWallet</h2>
          </a>
          <div className={ styles.data__wrapper }>
            <p>{ userEmail }</p>
            <p>{`Gasto total: ${total} BRL`}</p>
          </div>
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
