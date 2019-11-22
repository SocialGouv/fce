import React from "react";
import Mandataire from "./Mandataire";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/fontawesome-pro-solid";

class Mandataires extends React.Component {
  render() {
    const { enterprise } = this.props;
    const mandataires = enterprise.mandataires_sociaux || [];

    let items = mandataires.map((mandataire, index) => {
      return <Mandataire mandataire={mandataire} key={index} />;
    });

    return (
      <section id="mandataires" className="data-sheet__section">
        <div className="section-header">
          <span className="icon">
            <FontAwesomeIcon icon={faUsers} />
          </span>
          <h2 className="title">Mandataires sociaux</h2>
        </div>
        <div className="section-datas">
          {items.length ? (
            items
          ) : (
            <p className="has-text-center">Aucun mandataire n'a été trouvé</p>
          )}
        </div>
      </section>
    );
  }
}

export default Mandataires;
