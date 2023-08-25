import * as PropTypes from "prop-types";
import React from "react";

import { formatSiret } from "../../../../../helpers/utils";
import { getOrganismesFormations } from "../../../../../utils/entreprise/entreprise";
import { isOrganismeFormation } from "../../../../../utils/organisme-formation/organisme-formation";
import Data from "../../SharedComponents/Data";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";

const OrganismeFormation = ({ entreprise }) => {
  const organismes_formation = getOrganismesFormations(entreprise);
  return (
    <>
      {isOrganismeFormation(organismes_formation) ? (
        <Data
          key="OrganismeFormation"
          name="Organisme de formation"
          className="has-no-border"
          emptyValue=""
          links={organismes_formation.map(({ siret }) => (
            <div key={siret}>
              <SeeDetailsLink
                text={formatSiret(siret)}
                link={`/establishment/${siret}/#agrements`}
              />
            </div>
          ))}
        />
      ) : (
        <Data
          key="OrganismeFormation"
          name="Organisme de formation"
          emptyValue={"Pas d'organisme de formation"}
          className="has-no-border"
        />
      )}
    </>
  );
};

OrganismeFormation.propTypes = {
  entreprise: PropTypes.object.isRequired,
};

export default OrganismeFormation;
