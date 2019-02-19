import React from "react";
import Mandataire from "./Mandataire";

class Mandataires extends React.Component {
  render() {
    const { enterprise } = this.props;
    const mandataires = enterprise.mandataires_sociaux || [];

    let items = mandataires.map((mandataire, index) => {
      return <Mandataire mandataire={mandataire} key={index} />;
    });

    return (
      <section id="mandataire" className="enterprise-section">
        <h2 className="title is-size-4">Mandataires sociaux</h2>

        {items.length ? (
          items
        ) : (
          <p className="has-text-center">Aucun mandataire n'a été trouvé</p>
        )}
      </section>
    );
  }
}

export default Mandataires;
