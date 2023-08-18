import "./AccordsEntreprise.scss";

import PropTypes from "prop-types";
import React from "react";

import { toI18nDate } from "../../../../../helpers/Date";
import { formatNumber, formatSiret } from "../../../../../helpers/utils";
import Config from "../../../../../services/Config";
import { formatAccords } from "../../../../../utils/accords/accords";
import { getName } from "../../../../../utils/entreprise/entreprise";
import {
  getCategoryLabel,
  getState,
  isActive,
} from "../../../../../utils/establishment/establishment";
import BadgeWithIcon from "../../../../shared/Badge/BadgeWithIcon.jsx";
import Data from "../../SharedComponents/Data";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import Subcategory from "../../SharedComponents/Subcategory";
import { useAccordsEntrepriseBySiren } from "./AccordsEntreprise.gql";

const AccordsEntreprise = ({ enterprise }) => {
  const { data, loading, error } = useAccordsEntrepriseBySiren(
    enterprise.siren
  );

  if (loading || error) {
    return null;
  }

  const accords = data.etablissements_accords;
  const nbAccords = accords.length;
  const raisonSociale = getName(enterprise);
  const formattedAgreements = formatAccords(accords);

  return (
    <div>
      <Subcategory subtitle="Accords d'entreprise" sourceSi="D@cccord">
        <Data
          name="Nb total d'accords déposés par les différents établissements de l'entreprise"
          value={nbAccords}
          emptyValue="aucun accord connu"
          columnClasses={["is-9", "is-3"]}
          className="has-no-border"
        />
        {nbAccords > 0 && (
          <>
            <div className="data-sheet--table">
              <NonBorderedTable isScrollable={formattedAgreements.length > 6}>
                <thead>
                  <tr>
                    <th className="th">SIRET</th>
                    <th className="th table-cell--center-cell">État</th>
                    <th className="th">Catégorie établissement</th>
                    <th className="th">Nb accords déposés</th>
                    <th className="th">Date signature du dernier</th>
                  </tr>
                </thead>
                <tbody>
                  {formattedAgreements.map(
                    ({ siret, etablissement, total, lastSignatureDate }) => {
                      const etab = etablissement;
                      const isEtablissementActive = isActive(etab);
                      const stateClass = isEtablissementActive
                        ? "icon--success"
                        : "icon--danger";
                      const stateText = isEtablissementActive
                        ? "ouvert"
                        : "fermé";
                      return (
                        <tr key={siret}>
                          <td className="table-cell--nowrap">
                            <SeeDetailsLink
                              text={formatSiret(siret)}
                              link={`/establishment/${siret}/#relation`}
                            />
                          </td>
                          <td className="table-cell--center-cell">
                            {getState(etab) && (
                              <BadgeWithIcon
                                isTableBadge
                                text={stateText}
                                state={stateClass}
                              />
                            )}
                          </td>
                          <td>{getCategoryLabel(etablissement)}</td>
                          <td>{formatNumber(total)}</td>
                          <td>{toI18nDate(lastSignatureDate)}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </NonBorderedTable>
            </div>
            <div className="text">
              <a
                href={
                  Config.get("legifranceSearchUrl.accords") +
                  raisonSociale.toLowerCase()
                }
                target="_blank"
                rel="noreferrer noopener"
              >
                Rechercher ces accords sur Legifrance{" "}
              </a>
            </div>
          </>
        )}
      </Subcategory>
    </div>
  );
};

AccordsEntreprise.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default AccordsEntreprise;
