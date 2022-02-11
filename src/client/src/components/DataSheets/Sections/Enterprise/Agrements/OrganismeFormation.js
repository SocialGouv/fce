import * as PropTypes from "prop-types";
import React from "react";

import { getOrganismesFormations } from "../../../../../utils/entreprise/entreprise";
import { isOrganismeFormation } from "../../../../../utils/organisme-formation/organisme-formation";
import Data from "../../SharedComponents/Data";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table";

const OrganismeFormation = ({ entreprise }) => {
  const organismes_formation = getOrganismesFormations(entreprise);
  return (
    <Subcategory subtitle="Organisme de formation">
      <Data
        key="OrganismeFormation"
        name="Organisme de formation"
        value={isOrganismeFormation(organismes_formation)}
      />
      <div className="section-datas__list-item">
        {isOrganismeFormation(organismes_formation) && (
          <Table>
            <thead>
              <tr>
                <th>Siret</th>
              </tr>
            </thead>
            <tbody>
              {organismes_formation.map(({ siret }) => (
                <tr key={siret}>
                  <td>{siret}</td>
                  <td className="see-details">
                    <SeeDetailsLink
                      link={`/establishment/${siret}/#agrements`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </Subcategory>
  );
};

OrganismeFormation.propTypes = {
  entreprise: PropTypes.object.isRequired,
};

export default OrganismeFormation;
