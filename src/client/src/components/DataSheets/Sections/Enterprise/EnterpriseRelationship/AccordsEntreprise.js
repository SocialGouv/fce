import "./AccordsEntreprise.scss";

import { faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
} from "../../../../../utils/establishment/establishment";
import Data from "../../SharedComponents/Data";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import State from "../../SharedComponents/State";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table";
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
        />
        {nbAccords > 0 && (
          <>
            <Table className="enterprise-agreements">
              <thead>
                <tr>
                  <th className="th">SIRET</th>
                  <th className="th table-cell--center-cell">État</th>
                  <th className="th">Catégorie établissement</th>
                  <th className="th enterprise-agreements__count">
                    Nb accords déposés
                  </th>
                  <th className="th enterprise-agreements__last">
                    Date signature du dernier
                  </th>
                  <th className="th see-details" />
                </tr>
              </thead>
              <tbody>
                {formattedAgreements.map(
                  ({ siret, etablissement, total, lastSignatureDate }) => {
                    return (
                      <tr key={siret}>
                        <td className="table-cell--nowrap">
                          {formatSiret(siret)}
                        </td>
                        <td className="table-cell--center-cell">
                          <State state={getState(etablissement)} />
                        </td>
                        <td>{getCategoryLabel(etablissement)}</td>
                        <td className="has-text-right">
                          {formatNumber(total)}
                        </td>
                        <td>{toI18nDate(lastSignatureDate)}</td>
                        <td className="see-details">
                          <SeeDetailsLink
                            link={`/establishment/${siret}/#relation`}
                          />
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </Table>

            <a
              href={
                Config.get("legifranceSearchUrl.accords") +
                raisonSociale.toLowerCase()
              }
              target="_blank"
              rel="noreferrer noopener"
            >
              Rechercher ces accords sur Legifrance{" "}
              <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
            </a>
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
