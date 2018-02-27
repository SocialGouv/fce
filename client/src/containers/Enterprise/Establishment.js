import React from "react";
import { connect } from "react-redux";
import { Establishment as EstablishmentView } from "../../components/Enterprise";

class Establishment extends React.Component {
  render() {
    console.log(this.props.match.params.siret);
    return <EstablishmentView />;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Establishment);
