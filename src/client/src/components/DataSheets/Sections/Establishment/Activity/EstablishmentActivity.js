import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/pro-solid-svg-icons";
import _get from "lodash.get";

import Config from "../../../../../services/Config";
import { getSuccession } from "../../../../../helpers/Establishment";
import { getMonthName } from "../../../../../helpers/Date";
import Subcategory from "../../SharedComponents/Subcategory";

const EstablishmentActivity = ({ establishment }) => {
  const succession = getSuccession(
    establishment.successeur,
    establishment.predecesseur
  );

  return (
    <section id="activity" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faHistory} />
        </span>
        <h2 className="title">Activité</h2>
      </div>
      <div className="section-datas">
        <Subcategory
          subtitle="Lien de succession"
          datas={[
            {
              name: succession && succession.label,
              value: succession.datas && succession.datas.siret,
              emptyValue: "pas de prédecesseur ou de successeur",
              nonEmptyValue: "",
              link: succession.datas
                ? "/establishment/" + succession.datas.siret
                : null
            },
            {
              name: "Date du transfert",
              value: succession.datas && succession.datas.date_transfert,
              emptyValue: "-",
              nonEmptyValue: ""
            }
          ]}
          sourceSi="Sirène"
        />
        <Subcategory
          subtitle="Effectifs"
          datas={[
            {
              name: "Tranche Effectif INSEE",
              value: Config.get("inseeSizeRanges")[
                establishment.tranche_effectif_insee
              ],
              nonEmptyValue: "",
              sourceSi: "Sirène-year",
              sourceDate: establishment.annee_tranche_effectif_insee
            },
            {
              name: "Effectif physique",
              value: establishment.dernier_effectif_physique,
              nonEmptyValue: "",
              sourceSi: "DSN",
              hasNumberFormat: true
            },
            ...(establishment.effectifMensuelEtp
              ? establishment.effectifMensuelEtp.map(
                  ({ annee, mois, effectifs_mensuels }) => ({
                    name: `Effectif ETP ${getMonthName(mois)}`,
                    value: effectifs_mensuels,
                    nonEmptyValue: "",
                    sourceCustom: `Acoss / DSN ${getMonthName(mois)} ${annee}`,
                    hasNumberFormat: true
                  })
                )
              : [])
          ]}
        />
        <Subcategory
          subtitle="Développement économique"
          datas={[
            {
              name: "Filière stratégique",
              value:
                Array.isArray(establishment.interactions_3E) &&
                establishment.interactions_3E.length &&
                establishment.interactions_3E[0].filiere,
              nonEmptyValue: ""
            },
            {
              name: "ETI / PEPITE",
              value:
                Array.isArray(establishment.interactions_3E) &&
                establishment.interactions_3E.length &&
                establishment.interactions_3E[0].eti_pepite,
              nonEmptyValue: ""
            },
            {
              name: "Adhérent à un pole de compétitivité",
              value:
                Array.isArray(establishment.pole_competitivite) &&
                !!establishment.pole_competitivite.length,
              nonEmptyValue: ""
            }
          ]}
          sourceSi="EOS-monthYear"
        />
        {Array.isArray(establishment.pole_competitivite) &&
          !!establishment.pole_competitivite.length && (
            <ul>
              {establishment.pole_competitivite.map(pole => (
                <li className="is-size-6 has-text-grey-dark" key={pole}>
                  - {pole}
                </li>
              ))}
            </ul>
          )}
      </div>
    </section>
  );
};

EstablishmentActivity.propTypes = {
  establishment: PropTypes.object.isRequired
};

export default EstablishmentActivity;
