import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../services/Store/actions";
import HomeView from "../../components/Home";

class Home extends Component {
  logout = () => {
    this.props.logoutUser();
  };

  render() {
    return <HomeView user={this.props.user} logout={this.props.logoutUser} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
