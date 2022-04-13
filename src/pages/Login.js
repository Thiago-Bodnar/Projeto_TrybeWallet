import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setEmail } from '../actions';
import login from '../images/login.svg';
import styles from './Login.module.css';

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
          <h1 className="h1 mb-3 fw-normal">Trybe Wallet</h1>
          <img src={ login } alt="person looking at a expense sheet" />
          <form>
            <div className="form-floating">
              <input
                name="email"
                className="form-control"
                type="email"
                value={ email }
                data-testid="email-input"
                onChange={ this.handleChange }
                placeholder="E-mail"
              />
            </div>
            <div className="form-floating">

              <input
                name="password"
                type="password"
                className="form-control"
                value={ password }
                data-testid="password-input"
                onChange={ this.handleChange }
                placeholder="Senha"
              />
            </div>

            <button
              disabled={ isButtonDisabled }
              className="w-100 btn btn-lg btn-primary"
              type="button"
              onClick={ this.handleClick }
            >
              Entrar

            </button>
          </form>
          <p className="mt-5 mb-3 text-muted">Thiago Bodnar - 2022</p>
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
