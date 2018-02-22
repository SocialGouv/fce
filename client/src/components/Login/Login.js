import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../services/Store/actions";

import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirectToReferrer: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginSuccess !== null) {
      this.setState({
        hasError: !nextProps.loginSuccess,
        loading: false,
        redirectToReferrer: nextProps.loginSuccess
      });
    }
  }

  login = evt => {
    evt && evt.preventDefault();
    this.setState({ hasError: false, loading: true });

    this.props.loginUser(this.state.username, this.state.password);
  };

  updateLogin = evt => {
    const target = evt.target;

    this.setState({
      [target.name]: target.value
    });
  };

  render() {
    const { from } = (this.props.location && this.props.location.state) || {
      from: { pathname: "/" }
    };
    const { redirectToReferrer, hasError, login, loading } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="app-login container">
        <h1 className="logo _text-center">ITM</h1>
        <div className="row">
          <div className="column column-80 column-offset-10">
            <form onSubmit={this.login}>
              <fieldset>
                <label htmlFor="username">Identifiant:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={hasError ? "_border-error" : null}
                  onChange={evt => this.updateLogin(evt)}
                />
                <label htmlFor="password">Mdp:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={hasError ? "_border-error" : null}
                  onChange={evt => this.updateLogin(evt)}
                />
                {hasError ? (
                  <div className="input-hint _text-error _text-right">
                    Identifiant incorrect
                  </div>
                ) : null}
                <div className="login-button _text-center">
                  {loading ? (
                    <i className="fa fa-spinner fa-spin" aria-hidden="true" />
                  ) : (
                    <input
                      className="button-primary"
                      type="submit"
                      value="Se connecter"
                      onClick={this.login}
                    />
                  )}
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginSuccess: state.auth.loginSuccess,
    loginMessage: state.auth.loginMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => {
      dispatch(loginUser(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
