import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { isActiveEstablishment } from "../../../../../helpers/Search/Search.js";
import { formatSiret } from "../../../../../helpers/utils/format.js";
import {
  getLibelletFromCodeNaf,
  joinNoFalsy,
} from "../../../../../helpers/utils/utils.js";
import Config from "../../../../../services/Config/Config.js";
import { isActive } from "../../../../../utils/establishment/establishment.js";
import BadgeWithIcon from "../../../../shared/Badge/BadgeWithIcon.jsx";
import Value from "../../../../shared/Value/Value.js";
import { getEtablissementsCount } from "../../../Sidebar/Sidebar.gql.js";
import NonBorderedTable from "../NonBorderedTable/NonBorderedTable.js";
import PaginationTable from "../PaginationTable/PaginationTable.jsx";

const EstablishmentTable = ({ etablissements, entreprise }) => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);

  const staffSizeRanges = {
    ...Config.get("inseeSizeRanges"),
    "0 salarié": "0 salarié",
  };
  const rowsPerPage = 10;
  // Calculate the total number of pages
  const totalPages = Math.ceil(
    entreprise?.entreprise_nbr_etablissements_siren?.nb_eta / rowsPerPage
  );

  // Calculate the starting and ending index for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(
    startIndex + rowsPerPage,
    entreprise?.entreprise_nbr_etablissements_siren?.nb_eta
  );

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const etablissementsCount = entreprise
    ? getEtablissementsCount(entreprise)
    : 0;
  const renderTableBody = () => {
    const data =
      etablissementsCount > rowsPerPage
        ? etablissements?.slice(startIndex, endIndex)
        : etablissements;
    return data?.map((etablissement) => {
      const isEtablissementActive = isActive(etablissement);
      const stateClass = isEtablissementActive
        ? "icon--success"
        : "icon--danger";
      const stateText = isEtablissementActive ? "ouvert" : "fermé";
      return (
        <tr
          className="at__body__tr"
          key={etablissement?.siret}
          onClick={() => history.push(`/establishment/${etablissement?.siret}`)}
        >
          <td>
            <Link
              to={`/establishment/${etablissement?.siret}`}
              className="establishment__siret_link"
            >
              <Value value={formatSiret(etablissement?.siret)} />
            </Link>
          </td>
          <td>
            <BadgeWithIcon isTableBadge text={stateText} state={stateClass} />
          </td>

          <td>
            <Value
              value={joinNoFalsy(
                [
                  etablissement?.codepostaletablissement,
                  etablissement?.libellecommuneetablissement,
                ],
                " - "
              )}
            />
          </td>
          <td>
            <Value
              value={
                etablissement?.trancheeffectifsetablissement !== "-" &&
                etablissement?.trancheeffectifsetablissement !== "NN" &&
                etablissement?.trancheeffectifsetablissement !== "SP"
                  ? isActiveEstablishment(
                      etablissement?.etatadministratifetablissement
                    )
                    ? staffSizeRanges[
                        etablissement?.trancheeffectifsetablissement
                      ]
                    : "0 salarié"
                  : staffSizeRanges[
                      etablissement?.trancheeffectifsetablissement
                    ]
              }
            />
          </td>
          <td>
            <Value value={etablissement?.etb_raisonsociale} />
          </td>
          <td>{`${etablissement?.activiteprincipaleetablissement || ""} - ${
            getLibelletFromCodeNaf(
              etablissement?.activiteprincipaleetablissement
            ) || ""
          }`}</td>
        </tr>
      );
    });
  };
  return (
    <div className="data-sheet--table ">
      <NonBorderedTable className="direccte-interactions-establishment__table etbList">
        <thead>
          <tr>
            <th>SIRET</th>
            <th>État</th>
            <th>Code postal</th>
            <th>Effectif (DSN)</th>
            <th>Raison social / Nom</th>
            <th>Activité</th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </NonBorderedTable>
      {etablissementsCount > rowsPerPage && (
        <div className="table-pagination">
          <PaginationTable
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageClick={handlePageClick}
          />
        </div>
      )}{" "}
    </div>
  );
};

EstablishmentTable.propTypes = {
  entreprise: PropTypes.object.isRequired,
  etablissements: PropTypes.array.isRequired,
};
export default EstablishmentTable;
