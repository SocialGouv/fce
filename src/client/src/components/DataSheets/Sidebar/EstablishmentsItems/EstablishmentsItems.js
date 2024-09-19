import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { getSiret } from "../../../../utils/establishment/establishment";
import Establishment from "../Establishment";

const EstablishmentsItems = ({
  establishments,
  establishmentType,
  headOffice,
  match,
}) => (
  <>
    <h4 className="sidebar__establishments-type">{establishmentType}</h4>
    <ul>
      {establishments.map((establishment) => (
        <li
          key={getSiret(establishment)}
          className={classNames("sidebar__establishment", {
            "head-office": headOffice,
            "sidebar__establishment--current":
              establishment.siret === match.params.siret,
          })}
        >
          <Establishment establishment={establishment} effectif={false} />
        </li>
      ))}
    </ul>
  </>
);

EstablishmentsItems.propTypes = {
  establishmentType: PropTypes.string.isRequired,
  establishments: PropTypes.array.isRequired,
  headOffice: PropTypes.bool,
  limit: PropTypes.number,
  match: PropTypes.object.isRequired,
};

export default EstablishmentsItems;
