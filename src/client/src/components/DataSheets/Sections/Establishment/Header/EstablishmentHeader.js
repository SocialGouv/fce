import React from "react";
import PropTypes from "prop-types";
import Value from "../../../../shared/Value";
import Dashboard from "../Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltRight,
  faSquare,
  faCircle
} from "@fortawesome/pro-solid-svg-icons";
import { isActiveEstablishment } from "../../../../../helpers/Establishment";
import { formatAddress } from "../../../../../helpers/Address";
import InfoBox from "../../../../shared/InfoBox";
import "./establishmentHeader.scss";

class EstablishmentHeader extends React.Component {
  render() {
    const {
      establishment,
      establishment: { adresse_components }
    } = this.props;

    const address = adresse_components && formatAddress(adresse_components);

    const isActive = isActiveEstablishment(establishment);
    const stateClass = isActive ? "icon--success" : "icon--danger";

    return (
      <section id="header" className="establishment-header w-100 mb-4">
        <div className="has-text-link show-all-enterprise">
          <div
            className="responsive-item"
            data-show="quickview"
            data-target="enterprise"
          >
            <span>Voir les établissements</span>
            <span className="icon">
              <FontAwesomeIcon icon={faArrowAltRight} />
            </span>
          </div>
        </div>
        <h1 className="columns mb-4 is-capitalized has-text-weight-bold is-size-3">
          <Value
            value={
              (establishment.nom_commercial &&
                establishment.nom_commercial.toLowerCase()) ||
              `${(establishment.nom && establishment.nom.toLowerCase()) ||
                ""} ${(establishment.prenom &&
                establishment.prenom.toLowerCase()) ||
                ""}`.trim() ||
              null
            }
            empty=" "
          />
        </h1>
        <div className="columns">
          <InfoBox
            value={establishment.categorie_etablissement}
            infoBoxClasses={[
              "has-text-weight-bold",
              "has-text-roboto",
              "is-size-6"
            ]}
          />
        </div>
        <div className="columns is-vcentered w-100">
          <div className="column is-4">
            <span className="is-size-6 has-text-roboto has-text-weight-semibold has-text-grey-dark">
              SIRET :{" "}
            </span>
            <span className="is-size-6 has-text-roboto has-text-weight-semibold has-text-grey-dark">
              <Value value={establishment.siret} empty="" />
            </span>
          </div>
          <div className="column is-8">
            <span className="is-size-6 has-text-segoe has-text-grey-dark">
              <Value value={address} empty="" />
            </span>
          </div>
        </div>
        <div className="columns is-vcentered w-100">
          <div className="column is-4">
            <span className="active-item-value">
              <FontAwesomeIcon
                icon={isActive ? faCircle : faSquare}
                className={`mr-2 ${stateClass}`}
              />
            </span>
            <span className="is-size-6 has-text-segoe has-text-grey-dark">
              {isActive ? "Ouvert depuis le " : "Fermé depuis le "}
            </span>
            <span className="is-size-6 has-text-segoe has-text-grey-dark">
              <Value
                value={
                  isActive
                    ? establishment.date_creation
                    : establishment.date_fin ||
                      establishment.date_dernier_traitement_etablissement
                }
                empty=""
              />
            </span>
          </div>
          <div className="column is-8">
            <span className="is-size-6 has-text-segoe has-text-weight-semibold has-text-grey-dark">
              <Value value={establishment.naf} empty="-" />{" "}
              <Value
                value={
                  establishment.libelle_naf &&
                  establishment.libelle_naf.toLowerCase()
                }
                empty=""
              />
            </span>
          </div>
        </div>
        <Dashboard establishment={establishment} />
      </section>
    );
  }
}

EstablishmentHeader.propTypes = {
  establishment: PropTypes.object.isRequired,
  adresse_components: PropTypes.object
};

export default EstablishmentHeader;
