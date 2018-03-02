import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../services/Store/actions";
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

    this.props
      .loginUser(this.state.password)
      .then(response => {
        if (response.data.user) {
          this._loginSuccess(response.data.user);
        } else {
          this._loginFail();
        }
      })
      .catch(
        function(error) {
          this._loginFail();
        }.bind(this)
      );
  };

  _loginSuccess = user => {
    const { from } = (this.props.location && this.props.location.state) || {
      from: { pathname: "/" }
    };

    this.setState({
      hasError: false,
      loading: false,
      redirectTo: user.isAdmin ? "/admin" : from
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => {
      return dispatch(loginUser(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
