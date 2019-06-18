import React from "react";

import EstablishmentView from "./EstablishmentView";
import EnterpriseView from "./EnterpriseView";

class Direccte extends React.Component {
  render() {
    return this.props.establishment ? (
      <EstablishmentView establishment={this.props.establishment} />
    ) : this.props.enterprise ? (
      <EnterpriseView enterprise={this.props.enterprise} />
    ) : (
      (() => {
        throw new Error(
          "Expected establishment or enterprise in Direccte props"
        );
      })()
    );
  }
}

export default Direccte;
