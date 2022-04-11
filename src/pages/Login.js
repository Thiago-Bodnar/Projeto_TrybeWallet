import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setEmail } from '../actions';
import styles from './Login.module.css';
import login from '../images/login.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  validadeForm = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const minPasswordLength = 6;
    const validateEmail = regex.test(email);
    const validatePassword = password.length >= minPasswordLength;
    if (validateEmail && validatePassword) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  handleClick = () => {
    const { email } = this.state;
    const { setEmailToState, history } = this.props;
    setEmailToState({ email });
    history.push('/carteira');
  };

  handleChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, this.validadeForm);
  }

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <div className={ styles.login__container }>
        <div className={ styles.login__wrapper }>
          <h1>Trybe Wallet</h1>
          <img src={ login } alt="person looking at a expense sheet" />
          <form>
            <input
              name="email"
              type="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleChange }
              placeholder="E-mail"
            />
            <input
              name="password"
              type="password"
              value={ password }
              data-testid="password-input"
              onChange={ this.handleChange }
              placeholder="Senha"
            />
            <button
              disabled={ isButtonDisabled }
              type="button"
              onClick={ this.handleClick }
            >
              Entrar

            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmailToState: (email) => dispatch(setEmail(email)),
});

Login.propTypes = {
  setEmailToState: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
