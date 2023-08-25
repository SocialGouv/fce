import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { isActiveEstablishment } from "../../../../../helpers/Search";
import {
  formatSiret,
  getLibelletFromCodeNaf,
  joinNoFalsy,
} from "../../../../../helpers/utils";
import Config from "../../../../../services/Config";
import { getEtablissements } from "../../../../../utils/entreprise/entreprise";
import { isActive } from "../../../../../utils/establishment/establishment";
import BadgeWithIcon from "../../../../shared/Badge/BadgeWithIcon.jsx";
import Value from "../../../../shared/Value";
import {
  getEtablissementsCount,
  useSidebarData,
} from "../../../Sidebar/Sidebar.gql";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable";
import PaginationTable from "../../SharedComponents/PaginationTable/PaginationTable.jsx";

const ListEstablishment = ({ siren }) => {
  const { loading, data: entreprise, error } = useSidebarData(siren);
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);
  if (loading || error) {
    return null;
  }

  const rowsPerPage = 4;
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
  const etablissements = entreprise ? getEtablissements(entreprise) : [];
  const staffSizeRanges = {
    ...Config.get("inseeSizeRanges"),
    "0 salarié": "0 salarié",
  };
  const etablissementsCount = entreprise
    ? getEtablissementsCount(entreprise)
    : 0;
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section id="helps" className="data-sheet__bloc_section ">
      <div className="section-header ">
        <h2 className="dark-blue-title">
          Autres Etablissements (
          <Value value={etablissementsCount} empty="0" />)
        </h2>
      </div>
      <div className="section-datas">
        {etablissementsCount > 0 && (
          <div className="data-sheet--table ">
            <NonBorderedTable className="direccte-interactions-establishment__table">
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
              <tbody>
                {etablissements
                  ?.slice(startIndex, endIndex)
                  ?.map((etablissement) => {
                    const isEtablissementActive = isActive(etablissement);
                    const stateClass = isEtablissementActive
                      ? "icon--success"
                      : "icon--danger";
                    const stateText = isEtablissementActive
                      ? "ouvert"
                      : "fermé";
                    return (
                      <tr
                        className="at__body__tr"
                        key={etablissement?.siret}
                        onClick={() =>
                          history.push(`/establishment/${etablissement?.siret}`)
                        }
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
                          <BadgeWithIcon
                            isTableBadge
                            text={stateText}
                            state={stateClass}
                          />
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
                              etablissement?.trancheeffectifsetablissement !==
                                "-" &&
                              etablissement?.trancheeffectifsetablissement !==
                                "NN" &&
                              etablissement?.trancheeffectifsetablissement !==
                                "SP"
                                ? isActiveEstablishment(
                                    etablissement?.etatadministratifetablissement
                                  )
                                  ? staffSizeRanges[
                                      etablissement
                                        ?.trancheeffectifsetablissement
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
                        <td>{`${
                          etablissement?.activiteprincipaleetablissement || ""
                        } - ${
                          getLibelletFromCodeNaf(
                            etablissement?.activiteprincipaleetablissement
                          ) || ""
                        }`}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </NonBorderedTable>
            <div className="table-pagination">
              <PaginationTable
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageClick={handlePageClick}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

ListEstablishment.propTypes = {
  siren: PropTypes.string.isRequired,
};

export default ListEstablishment;
