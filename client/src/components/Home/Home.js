import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../services/Store/actions";
import "./home.css";

class Login extends Component {
  logout = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <div className="home-page">
        <section className="home-section">
          <button onClick={this.logout}>Se déconnecter</button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
