import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Auth from "../../services/Auth";
import LoginView from "../../components/Login";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      redirectTo: false
    };
  }

  login = evt => {
    evt && evt.preventDefault();
    this.setState({ hasError: false, loading: true });

    Auth.login(this.state.password)
      .then(response => {
        if (response.data.user) {
          this._loginSuccess(response.data.user);
        } else {
          this._loginFail();
        }
      })
      .catch(error => {
        this._loginFail();
      });
  };

  _loginSuccess = user => {
    const { from } = (this.props.location && this.props.location.state) || {
      from: { pathname: "/" }
    };

    this.setState({
      hasError: false,
      loading: false,
      redirectTo: from
    });
  };

  _loginFail = () => {
    this.setState({
      hasError: true,
      loading: false,
      redirectTo: false
    });
  };

  updateLogin = evt => {
    const target = evt.target;

    this.setState({
      [target.name]: target.value
    });
  };

  render() {
    const { redirectTo, hasError, loading } = this.state;

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <LoginView
        login={this.login}
        updateForm={this.updateLogin}
        loading={loading}
        hasError={hasError}
      />
    );
  }
}

export default Login;
