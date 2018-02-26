import React from "react";
import { connect } from "react-redux";
import { Enterprise as EnterpriseView } from "../../components/Enterprise";

class Enterprise extends React.Component {
  render() {
    console.log(this.props.match.params.siren);
    return <EnterpriseView />;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Enterprise);
