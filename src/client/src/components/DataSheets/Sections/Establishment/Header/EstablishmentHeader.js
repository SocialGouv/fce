import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Value from "../../../../shared/Value";
import Dashboard from "../Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCircle } from "@fortawesome/pro-solid-svg-icons";
import { getEnterpriseName } from "../../../../../helpers/Enterprise";
import { isActiveEstablishment } from "../../../../../helpers/Establishment";
import { formatAddress } from "../../../../../helpers/Address";
import InfoBox from "../../../../shared/InfoBox";
import { formatSiret } from "../../../../../helpers/utils";
import NonDiffusableBadge from "../../../../shared/NonDiffusableBadge/NonDiffusableBadge";

const EstablishmentHeader = ({
  enterprise,
  establishment,
  establishment: { adresse_composant },
  apprentissage,
}) => {
  const address = adresse_composant && formatAddress(adresse_composant);

  const isActive = isActiveEstablishment(establishment);
  const stateClass = isActive ? "icon--success" : "icon--danger";
  return (
    <section id="header" className="data-sheet-header">
      <Helmet>
        <title>FCE - établissement {getEnterpriseName(enterprise) || ""}</title>
      </Helmet>

      <h1 className="data-sheet-header__title">
        <Value value={getEnterpriseName(enterprise) || null} empty=" " />
      </h1>

      <InfoBox value={establishment.categorie_etablissement} />

      {establishment.diffusable_commercialement === false && (
        <div className="columns">
          <div className="column">
            <NonDiffusableBadge />
          </div>
        </div>
      )}

      <div className="columns is-vcentered data-sheet-header__primary-infos">
        <div className="column is-4 data-sheet-header__siret">
          <span>SIRET : </span>
          <span>
            <Value value={formatSiret(establishment.siret)} empty="" />
          </span>
        </div>
        <div className="column is-8">
          <span className="has-text-segoe">
            <Value value={address} empty="" />
          </span>
        </div>
      </div>

      <div className="columns">
        <div className="column is-4">
          <div className="data-sheet-header__status">
            <div>
              <FontAwesomeIcon
                icon={isActive ? faCircle : faSquare}
                className={`data-sheet-header__status-icon ${stateClass}`}
              />
            </div>
            <div className="has-text-segoe">
              {isActive ? (
                <span>
                  Ouvert depuis le{" "}
                  <Value value={establishment.date_creation} empty="" />
                </span>
              ) : (
                <div>
                  <div>
                    Fermé depuis le{" "}
                    <Value
                      value={
                        establishment.date_fin ||
                        establishment.date_dernier_traitement_etablissement
                      }
                      empty=""
                    />
                  </div>
                  <div>
                    Date de création:{" "}
                    <Value value={establishment.date_creation} empty="" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="column is-8">
          <span className="has-text-segoe data-sheet-header__naf">
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
      <Dashboard establishment={establishment} apprentissage={apprentissage} />
    </section>
  );
};

EstablishmentHeader.propTypes = {
  enterprise: PropTypes.object.isRequired,
  establishment: PropTypes.object.isRequired,
  adresse_composant: PropTypes.object,
  apprentissage: PropTypes.object.isRequired,
};

export default EstablishmentHeader;
