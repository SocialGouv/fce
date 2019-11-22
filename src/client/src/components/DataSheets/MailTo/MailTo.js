import React from "react";
import Config from "../../../services/Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/pro-light-svg-icons";

class MailTo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {}
    };
  }

  componentDidMount() {
    this.setState({ email: Config.get("emailInformation") });
  }

  getTo = () => {
    return this.state.email.to;
  };

  getSubject = () => {
    return this.state.email.subject;
  };

  getBody = () => {
    return encodeURIComponent(`Bonjour,

Suite à la consultation de la fiche  « ${
      this.props.type === "enterprise" ? "Entreprise" : "Etablissement"
    } » sur la FCE, je souhaiterais obtenir de la documentation sur :

${
  this.props.type === "enterprise"
    ? `l'entreprise « ${this.props.enterprise.raison_sociale ||
        this.props.enterprise.nom +
          " " +
          this.props.enterprise.prenom} »  (ayant le numéro SIREN « ${
        this.props.enterprise.siren
      } ») et ses établissements.`
    : `l'entreprise  « ${this.props.enterprise.raison_sociale ||
        this.props.enterprise.nom +
          " " +
          this.props.enterprise.prenom} »  (ayant le numéro SIREN « ${
        this.props.enterprise.siren
      } ») et plus spécifiquement sur son  établissement  ( « Numéro SIRET= ${
        this.props.establishment.siret
      } » ) situé à « ${this.props.establishment.adresse_components &&
        this.props.establishment.adresse_components.localite} ».`
}

En vous remerciant pour les éléments que vous  pourrez m’apporter.

Cordialement`);
  };

  render() {
    return (
      <a
        className="button is-primary"
        href={`mailto:${this.getTo()}?subject=${this.getSubject()}&body=${this.getBody()}`}
      >
        <span className="icon">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <span>Demande d'informations</span>
      </a>
    );
  }
}

export default MailTo;
