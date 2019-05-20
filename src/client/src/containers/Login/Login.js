import React, { Component } from "react";
import Auth from "../../services/Auth";
import LoginView from "../../components/Login";
import _get from "lodash.get";

class Login extends Component {
  state = {
    email: "",
    hasError: false,
    errorMessage: null,
    hasSuccess: false,
    loading: false
  };

  login = evt => {
    evt && evt.preventDefault();
    this.setState({ hasError: false, hasSuccess: false, loading: true });

    Auth.sendMagicLink(this.state.email)
      .then(response => {
        if (response.data && response.data.success) {
          this._loginSuccess();
        } else {
          this._loginFail(
            _get(response, "data.message", "La tentative de connexion a échoué")
          );
        }
      })
      .catch(error => {
        this._loginFail("La tentative de connexion a échoué");
      });
  };

  _loginSuccess = () => {
    this.setState({
      hasError: false,
      hasSuccess: true,
      loading: false
    });
  };

  _loginFail = message => {
    this.setState({
      hasError: true,
      errorMessage: message,
      hasSuccess: false,
      loading: false
    });
  };

  updateLogin = evt => {
    const target = evt.target;

    this.setState({
      [target.name]: target.value
    });
  };

  render() {
    const { hasSuccess, hasError, loading, errorMessage } = this.state;

    return (
      <LoginView
        login={this.login}
        updateForm={this.updateLogin}
        loading={loading}
        hasError={hasError}
        hasSuccess={hasSuccess}
        errorMessage={errorMessage}
      />
    );
  }
}

export default Login;
