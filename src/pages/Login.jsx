import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      disableButton: true,
      textinput: '',
      loadingText: false,
      redirect: false,
    };
  }

  onInputChange = ({ target }) => {
    const textLength = 3;
    const { value, name } = target;
    if (value.length < textLength) {
      this.setState({
        [name]: value,
        disableButton: true,
      });
    } else {
      this.setState({
        [name]: value,
        disableButton: false,
      });
    }
  };

  onButton = async () => {
    const { textinput } = this.state;
    this.setState({
      loadingText: true,
    });
    await createUser({ name: textinput });
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { disableButton, loadingText, redirect } = this.state;
    if (loadingText) {
      return (
        <>
          <Loading />
          { redirect && <Redirect to="/search" /> }
        </>
      );
    }
    return (
      <>
        <div data-testid="page-login">
          Login
        </div>
        <form>
          <label htmlFor="textinput">
            Digite seu nome:
            <input
              name="textinput"
              placeholder="name"
              id="textinput"
              type="text"
              data-testid="login-name-input"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ disableButton }
            onClick={ this.onButton }
          >
            Entrar
          </button>
        </form>
      </>
    );
  }
}

export default Login;
