import "./ListEstablishmentsResult.scss";

import React from "react";

import { getEtablissements } from "../../../../utils/entreprise/entreprise.js";
import Value from "../../../shared/Value/Value.js";
import { getEtablissementsCount } from "../../Sidebar/Sidebar.gql.js";
import { useEstablishmentData } from "../SharedComponents/EstablishmentContext.jsx";
import EstablishmentTable from "../SharedComponents/EstablishmentTable/EstablishmentTable.jsx";

export const Establishments = () => {
  const { loading, data: entreprise, error } = useEstablishmentData();

  if (loading || error) {
    return null;
  }
  const etablissementsCount = entreprise
    ? getEtablissementsCount(entreprise)
    : 0;
  const etablissements = entreprise ? getEtablissements(entreprise) : [];

  return (
    <div className="sheet-container">
      <h2 className="title">
        Liste des etablissements (
        <Value value={etablissementsCount} empty="0" />)
      </h2>
      <EstablishmentTable
        entreprise={entreprise}
        etablissements={etablissements}
      />
    </div>
  );
};
