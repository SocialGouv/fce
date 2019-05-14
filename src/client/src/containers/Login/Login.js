import React, { Component } from "react";
import Auth from "../../services/Auth";
import LoginView from "../../components/Login";

class Login extends Component {
  state = {
    email: "",
    hasError: false,
    hasSuccess: false,
    loading: false
  };

  login = evt => {
    evt && evt.preventDefault();
    this.setState({ hasError: false, hasSuccess: true, loading: true });

    Auth.sendMagicLink(this.state.email)
      .then(response => {
        if (response.data && response.data.success) {
          this._loginSuccess();
        } else {
          this._loginFail();
        }
      })
      .catch(error => {
        this._loginFail();
      });
  };

  _loginSuccess = () => {
    this.setState({
      hasError: false,
      hasSuccess: true,
      loading: false
    });
  };

  _loginFail = () => {
    this.setState({
      hasError: true,
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
    const { hasSuccess, hasError, loading } = this.state;

    return (
      <LoginView
        login={this.login}
        updateForm={this.updateLogin}
        loading={loading}
        hasError={hasError}
        hasSuccess={hasSuccess}
      />
    );
  }
}

export default Login;
