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
        <h1 className="title h4">Mandataires sociaux</h1>

        {items.length ? (
          items
        ) : (
          <p className="text-center">Aucun mandataire n'a été trouvé</p>
        )}
      </section>
    );
  }
}

export default Mandataires;
