import React from "react";
import { connect } from "react-redux";
import { Establishment as EstablishmentView } from "../../components/Enterprise";

class Establishment extends React.Component {
  render() {
    const enterprise = { test: true };
    const headOffice = { test: true };

    const establishments = [{ test: true }, { test: true }];

    return (
      <EstablishmentView
        enterprise={enterprise}
        headOffice={headOffice}
        establishments={establishments}
      />
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Establishment);
