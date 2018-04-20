import React from "react";
import EstablishmentTransfert from "./EstablishmentTransfert";

class EstablishmentPredesSucce extends React.Component {
  render() {
    const { establishment } = this.props;

    return (
      <section id="predessucce" className="enterprise-section">
        <h1 className="title h4">Prédecesseur / Succcesseur</h1>
        {!establishment.predecesseur && !establishment.successeur ? (
          <p className="text-center">Pas d'informations</p>
        ) : (
          <dl className="dl row">
            <EstablishmentTransfert
              predecesseur={true}
              data={establishment.predecesseur}
            />
            <EstablishmentTransfert
              successeur={true}
              data={establishment.successeur}
            />
          </dl>
        )}
      </section>
    );
  }
}

export default EstablishmentPredesSucce;
