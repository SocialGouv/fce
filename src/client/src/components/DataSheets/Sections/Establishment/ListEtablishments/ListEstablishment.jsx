import PropTypes from "prop-types";
import React from "react";

import Config from "../../../../../services/Config";
import { getEtablissements } from "../../../../../utils/entreprise/entreprise";
import {
  getEtablissementsCount,
  useSidebarData,
} from "../../../Sidebar/Sidebar.gql";

const ListEstablishment = ({ siret, siren }) => {
  const limitItems = Config.get("sidebarEstablishmentsLimit");
  const {
    loading,
    data: entreprise,
    error,
  } = useSidebarData(siren, {
    limit: limitItems,
  });

  if (loading || error) {
    return null;
  }
  const etablissements = entreprise ? getEtablissements(entreprise) : [];

  const etablissementsCount = entreprise
    ? getEtablissementsCount(entreprise)
    : 0;

  console.log(siret, etablissements, etablissementsCount);
  return (
    <section id="helps" className="data-sheet__bloc_section ">
      <div className="section-header ">
        <h2 className="dark-blue-title">Autres Etablissements</h2>
      </div>
      <div className="section-datas">Dev en cours ...</div>
    </section>
  );
};

ListEstablishment.propTypes = {
  siren: PropTypes.string.isRequired,
  siret: PropTypes.string.isRequired,
};

export default ListEstablishment;
