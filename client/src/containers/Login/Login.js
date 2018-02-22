import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../services/Store/actions";
import LoginView from "../../components/Login";

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
    const { redirectToReferrer, hasError, loading } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <LoginView
        login={this.login}
        updateForm={this.updateLogin}
        loading={loading}
        hasError={hasError}
        message={this.props.loginMessage}
      />
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
