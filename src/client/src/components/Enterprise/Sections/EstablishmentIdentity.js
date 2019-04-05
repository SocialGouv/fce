import React from "react";
import Value from "../../../elements/Value";
import classNames from "classnames";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/fontawesome-pro-solid";

class EstablishmentIdentity extends React.Component {
  render() {
    const { establishment } = this.props;

    const stateClass =
      establishment.etat_etablissement === "A"
        ? "icon--success"
        : "icon--danger";

    return (
      <section id="identity-et" className="enterprise-section">
        <h2 className="title is-size-4">Identité de l'établissement</h2>

        <div className="columns">
          <div className="column is-6">
            <h4 className="subtitle is-size-5">Identité</h4>
            <div className=" columns">
              <h5 className="column is-3">Siège social</h5>
              <span className="column is-8">
                <Value value={establishment.siege_social} empty="-" />
              </span>
            </div>
            <div className=" columns">
              <h5 className="column is-3">Enseigne</h5>
              <span className="column is-8">
                <Value value={establishment.enseigne} empty="-" />
              </span>
            </div>
            <div className=" columns">
              <h5 className="column is-3">SIRET</h5>
              <span className="column is-8">
                <Value value={establishment.siret} empty="-" />
              </span>
            </div>
          </div>
          <div className="column is-6">
            <h4 className="subtitle is-size-5">Localisation</h4>
            <div className=" columns">
              <h5 className="column is-3">Adresse</h5>
              <span className="column is-8">
                <Value
                  value={establishment.adresse}
                  breakLines={true}
                  empty="-"
                />
              </span>
            </div>
            <div className=" columns">
              <h5 className="column is-3">Département</h5>
              <span className="column is-8">
                <Value
                  value={
                    establishment.departement
                      ? establishment.departement
                      : establishment.adresse_components
                      ? establishment.adresse_components.code_postal.slice(0, 2)
                      : null
                  }
                  empty="-"
                />
              </span>
            </div>
            <div className=" columns">
              <h5 className="column is-3">Région</h5>
              <span className="column is-8">
                <Value value={establishment.region} empty="-" />
              </span>
            </div>
          </div>
        </div>
        <h4 className="subtitle is-size-5">Etat</h4>
        <div className="columns">
          <h5 className="column is-3">Date de création</h5>
          <span className="column is-8">
            <Value value={establishment.date_creation} empty="-" />
          </span>
        </div>
        <div className="columns">
          <h5 className="column is-3">Etat de l'établissement</h5>
          <span className="column is-8">
            {establishment.etat_etablissement && (
              <FontAwesomeIcon
                className={classNames(stateClass)}
                icon={faCircle}
              />
            )}
          </span>
        </div>
        <div className="columns">
          <h5 className="column is-3">Date de la mise à jour</h5>
          <span className="column is-8">
            <Value
              value={
                establishment.etat_etablissement === "F"
                  ? establishment.date_fin
                  : establishment.date_dernier_traitement_etablissement
              }
              empty="-"
            />
          </span>
        </div>
      </section>
    );
  }
}

export default EstablishmentIdentity;
