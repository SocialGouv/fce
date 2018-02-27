import React from "react";
import { connect } from "react-redux";
import { Enterprise as EnterpriseView } from "../../components/Enterprise";

class Enterprise extends React.Component {
  render() {
    const enterprise = { test: true };
    const headOffice = { test: true };

    const establishments = [{ test: true }, { test: true }];

    return (
      <EnterpriseView
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

export default connect(mapStateToProps, mapDispatchToProps)(Enterprise);
