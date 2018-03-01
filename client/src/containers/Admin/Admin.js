import React from "react";
import { connect } from "react-redux";
import AdminView from "../../components/Admin";

class Admin extends React.Component {
  render() {
    return <AdminView />;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
