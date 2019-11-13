import React, { Component } from "react";
import Auth from "../../services/Auth";
import LoginView from "../../components/Login";
import _get from "lodash.get";
import UAParser from "ua-parser-js";
class Login extends Component {
  state = {
    email: "",
    hasSuccess: false,
    hasError: false,
    errorMessage: null,
    loading: false,
    step: "login-home",
    showSuccessNotif: true
  };

  login = evt => {
    evt && evt.preventDefault();
    this.setState({ hasError: false, hasSuccess: false, loading: true });

    const ua = new UAParser();

    Auth.sendMagicLink(this.state.email, ua.getBrowser().name)
      .then(response => {
        if (response.data && response.data.success) {
          this._loginSuccess();
          this.setStep("login-form-success");
          if (this.state.showSuccessNotif === false) {
            this.setShowSuccessNotif(true);
          }
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

  setStep = step => {
    this.setState({
      step
    });
  };

  setShowSuccessNotif = status => {
    this.setState({
      showSuccessNotif: status
    });
  };

  render() {
    const {
      hasError,
      loading,
      errorMessage,
      email,
      step,
      showSuccessNotif
    } = this.state;

    return (
      <LoginView
        login={this.login}
        updateForm={this.updateLogin}
        loading={loading}
        hasError={hasError}
        errorMessage={errorMessage}
        email={email}
        step={step}
        setStep={this.setStep}
        showSuccessNotif={showSuccessNotif}
        setShowSuccessNotif={this.setShowSuccessNotif}
      />
    );
  }
}

export default Login;
