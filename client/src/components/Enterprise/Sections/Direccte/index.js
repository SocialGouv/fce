import React from "react";

import EstablishementView from "./EstablishementView";
import EnterpriseView from "./EnterpriseView";

class Direccte extends React.Component {
  render() {
    return this.props.establishment ? (
      <EstablishementView establishment={this.props.establishment} />
    ) : this.props.enterprise ? (
      <EnterpriseView enterprise={this.props.enterprise} />
    ) : (
      (() => {
        throw new Error(
          "Expected establishement or enterprise in Direccte props"
        );
      })()
    );
  }
}

export default Direccte;
