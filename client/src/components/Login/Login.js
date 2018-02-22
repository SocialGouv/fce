import React, { Component } from "react";
import "./login.css";

class Login extends Component {
  render() {
    return (
      <div className="app-login container">
        <h1 className="logo _text-center">ITM</h1>
        <div className="row">
          <div className="column column-80 column-offset-10">
            <form onSubmit={this.props.login}>
              <fieldset>
                <label htmlFor="username">Identifiant:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={this.props.hasError ? "_border-error" : null}
                  onChange={evt => this.props.updateForm(evt)}
                />
                <label htmlFor="password">Mdp:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={this.props.hasError ? "_border-error" : null}
                  onChange={evt => this.props.updateForm(evt)}
                />
                {this.props.hasError ? (
                  <div className="input-hint _text-error _text-right">
                    Identifiant incorrect
                  </div>
                ) : null}
                <div className="login-button _text-center">
                  {this.props.loading ? (
                    <i className="fa fa-spinner fa-spin" aria-hidden="true" />
                  ) : (
                    <input
                      className="button-primary"
                      type="submit"
                      value="Se connecter"
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

export default Login;
