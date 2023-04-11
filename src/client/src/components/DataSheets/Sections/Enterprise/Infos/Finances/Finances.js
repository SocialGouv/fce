import "./finances.scss";

import PropTypes from "prop-types";
import React from "react";

import { renderIfSiret } from "../../../../../../helpers/hoc/renderIfSiret";
import {
  getDateDeclaration,
  getFormattedChiffreAffaire,
} from "../../../../../../utils/donnees-ecofi/donnees-ecofi";
import LoadSpinner from "../../../../../shared/LoadSpinner";
import Value from "../../../../../shared/Value";
import Table from "../../../SharedComponents/Table";
import { useFinanceData } from "./Finances.gql";

const getKey = (label, donneeEcofi) =>
  `${label}-${getDateDeclaration(donneeEcofi)}`;

const Finances = ({ siret }) => {
  const { loading, data: donneesEcofi, error } = useFinanceData(siret);

  if (loading) {
    return <LoadSpinner />;
  }

  if (error) {
    return <Value value={error} />;
  }

  let dates = [];
  let caList = [];
  let resultats = [];
  let capitauxPropres = [];

  if (donneesEcofi) {
    dates = donneesEcofi.map((donneeEcofi) => {
      return (
        <th
          className="has-text-right"
          key={getKey("data.date_fin_exercice", donneeEcofi)}
        >
          <Value value={getDateDeclaration(donneeEcofi)} empty="-" />
        </th>
      );
    });
    caList = donneesEcofi.map((donneeEcofi) => {
      return (
        <td className="has-text-right" key={getKey("data.ca", donneeEcofi)}>
          <Value value={getFormattedChiffreAffaire(donneeEcofi)} empty="-" />
        </td>
      );
    });

    resultats = donneesEcofi.map((donneeEcofi) => {
      return (
        <td className="has-text-right" key={getKey("resultat", donneeEcofi)}>
          Non disponible
        </td>
      );
    });

    capitauxPropres = donneesEcofi.map((donneeEcofi) => {
      return (
        <td className="has-text-right" key={getKey("capitaux", donneeEcofi)}>
          Non disponible
        </td>
      );
    });
  }

  return donneesEcofi ? (
    <Table className="enterprise-finances">
      <thead>
        <tr>
          <th>Date fin exercice</th>
          {dates}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Chiffre d{"'"}affaires</th>
          {caList}
        </tr>
        <tr>
          <th scope="row">Résultats</th>
          {resultats}
        </tr>
        <tr>
          <th scope="row">Capitaux propres</th>
          {capitauxPropres}
        </tr>
      </tbody>
    </Table>
  ) : (
    <p className="enterprise-finances__not-available has-text-centered">
      Non disponible
    </p>
  );
};

Finances.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(Finances);
