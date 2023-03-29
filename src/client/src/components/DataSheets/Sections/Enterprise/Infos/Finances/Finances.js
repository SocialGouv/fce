import "./finances.scss";

import PropTypes from "prop-types";
import React from "react";

import { renderIfSiren } from "../../../../../../helpers/hoc/renderIfSiren";
import {
  getDateDeclaration,
  getFormattedChiffreAffaire,
  getFormattedEBE,
  getFormattedEBIT,
  getFormattedMargeBrute,
  getFormattedResult,
} from "../../../../../../utils/donnees-ecofi/donnees-ecofi";
import LoadSpinner from "../../../../../shared/LoadSpinner";
import Value from "../../../../../shared/Value";
import Table from "../../../SharedComponents/Table";
import { useFinanceData } from "./Finances.gql";

const getKey = (label, donneeEcofi) =>
  `${label}-${getDateDeclaration(donneeEcofi)}`;

const Finances = ({ siren }) => {
  const { loading, data: donneesEcofi, error } = useFinanceData(siren);

  if (loading) {
    return <LoadSpinner />;
  }

  if (error) {
    return <Value value={error} />;
  }

  let dates = [];
  let caList = [];
  let margeBrute = [];
  let EBE = [];
  let resultats = [];
  let resultExploi = [];
  let capitauxPropres = [];

  if (donneesEcofi) {
    dates = donneesEcofi.map((donneeEcofi) => {
      return (
        <th className="has-text-right" key={getKey("date", donneeEcofi)}>
          <Value value={getDateDeclaration(donneeEcofi)} empty="-" />
        </th>
      );
    });
    caList = donneesEcofi.map((donneeEcofi) => {
      return (
        <td className="has-text-right" key={getKey("ca", donneeEcofi)}>
          <Value value={getFormattedChiffreAffaire(donneeEcofi)} empty="-" />
        </td>
      );
    });
    margeBrute = donneesEcofi.map((donneeEcofi) => {
      return (
        <td className="has-text-right" key={getKey("Marge_brute", donneeEcofi)}>
          <Value value={getFormattedMargeBrute(donneeEcofi)} empty="-" />
        </td>
      );
    });
    EBE = donneesEcofi.map((donneeEcofi) => {
      return (
        <td className="has-text-right" key={getKey("EBE", donneeEcofi)}>
          <Value value={getFormattedEBE(donneeEcofi)} empty="-" />
        </td>
      );
    });
    resultExploi = donneesEcofi.map((donneeEcofi) => {
      return (
        <td className="has-text-right" key={getKey("EBIT", donneeEcofi)}>
          <Value value={getFormattedEBIT(donneeEcofi)} empty="-" />
        </td>
      );
    });
    resultats = donneesEcofi.map((donneeEcofi) => {
      capitauxPropres = donneesEcofi.map((donneeEcofi) => {
        return (
          <td className="has-text-right" key={getKey("capitaux", donneeEcofi)}>
            Non disponible
          </td>
        );
      });

      return (
        <td
          className="has-text-right"
          key={getKey("Resultat_net", donneeEcofi)}
        >
          <Value value={getFormattedResult(donneeEcofi)} empty="-" />
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
          <th scope="row">Chiffre d{"'"}affaires (€)</th>
          {caList}
        </tr>
        <tr>
          <th scope="row">Marge brute (€)</th>
          {margeBrute}
        </tr>
        <tr>
          <th scope="row">EBITDA-EBE (€)</th>
          {EBE}
        </tr>
        <tr>
          <th scope="row">{`Résultat d'exploitation (€)`}</th>
          {resultExploi}
        </tr>
        <tr>
          <th scope="row">Résultat net (€)</th>
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
  siren: PropTypes.string.isRequired,
};

export default renderIfSiren(Finances);
