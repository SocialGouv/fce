import React, { Component } from "react";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import Auth from "../../services/Auth";
import MagicLinkView from "../../components/MagicLink";
import _get from "lodash.get";

class MagicLink extends Component {
  state = {
    hasError: false,
    errorMessage: null,
    hasSuccess: false,
    loading: false
  };

  componentDidMount() {
    const key = _get(this.props, "match.params.key");
    this.login(key);
  }

  login = key => {
    this.setState({ hasError: false, hasSuccess: false, loading: true });

    Auth.loginWithMagicLink(key)
      .then(response => {
        if (response.data && response.data.success) {
          this._loginSuccess();
        } else {
          this._loginFail(
            _get(
              response,
              "data.message",
              "La tentative de connexion a échouée"
            )
          );
        }
      })
      .catch(error => {
        this._loginFail("La tentative de connexion a échouée");
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

  render() {
    const { hasSuccess, hasError, loading, errorMessage } = this.state;

    if (hasSuccess) {
      return <Redirect push to={"/"} />;
    }

    return (
      <MagicLinkView
        loading={loading}
        hasError={hasError}
        errorMessage={errorMessage}
      />
    );
  }
}

export default withRouter(MagicLink);
