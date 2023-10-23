import * as PropTypes from "prop-types";
import React from "react";

import { getOrganismesFormations } from "../../../../../utils/entreprise/entreprise";
import { isOrganismeFormation } from "../../../../../utils/organisme-formation/organisme-formation";
import Data from "../../SharedComponents/Data";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink/SeeDetailsLink";

const OrganismeFormation = ({ entreprise }) => {
  const organismes_formation = getOrganismesFormations(entreprise);
  return (
    <>
      <Data
        key="OrganismeFormation"
        name="Organisme de formation"
        value={isOrganismeFormation(organismes_formation)}
      />
      <div className="section-datas__list-item">
        {isOrganismeFormation(organismes_formation) && (
          <NonBorderedTable>
            <thead>
              <tr>
                <th>Siret</th>
                <th>Denomination</th>
              </tr>
            </thead>
            <tbody>
              {organismes_formation.map(({ siret, denomination }) => (
                <tr key={siret}>
                  <td>
                    <SeeDetailsLink
                      link={`/establishment/${siret}/#agrements`}
                      text={siret}
                    />
                  </td>
                  <td className="see-details"> {denomination}</td>
                </tr>
              ))}
            </tbody>
          </NonBorderedTable>
        )}
      </div>
    </>
  );
};

OrganismeFormation.propTypes = {
  entreprise: PropTypes.object.isRequired,
};

export default OrganismeFormation;
