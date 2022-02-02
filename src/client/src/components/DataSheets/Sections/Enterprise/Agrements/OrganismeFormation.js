import PgApiDataHandler from "../../SharedComponents/PgApiDataHandler";
import Data from "../../SharedComponents/Data";
import { isOrganismeFormation } from "../../../../../utils/organisme-formation/organisme-formation";
import Subcategory from "../../SharedComponents/Subcategory";
import React from "react";
import * as PropTypes from "prop-types";
import { useOrganismeFormationBySiren } from "../../../../../services/OrganismeFormation/hooks";
import Table from "../../SharedComponents/Table";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";

const OrganismeFormation = ({ siren }) => {
  const { data, loading, error } = useOrganismeFormationBySiren(siren);
  return (
    <Subcategory subtitle="Organisme de formation">
      <PgApiDataHandler isLoading={loading} error={error}>
        {loading === false && (
          <>
            <Data
              key="OrganismeFormation"
              name="Organisme de formation"
              value={isOrganismeFormation(data.organismes_formation)}
            />
            <div className="section-datas__list-item">
              {isOrganismeFormation(data.organismes_formation) && (
                <Table>
                  <thead>
                    <tr>
                      <th>Siret</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.organismes_formation.map(({ siret }) => (
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
          </>
        )}
      </PgApiDataHandler>
    </Subcategory>
  );
};

OrganismeFormation.propTypes = {
  siren: PropTypes.string
};

export default OrganismeFormation;
