import "./finances.scss";

import PropTypes from "prop-types";
import React from "react";

import { renderIfSiren } from "../../../../../../helpers/hoc/renderIfSiren";
import {
  concatApiEntrepriseBceData,
  getDateDeclaration,
  getFormattedChiffreAffaire,
  getFormattedEBE,
  getFormattedEBIT,
  getFormattedMargeBrute,
  getFormattedResult,
  sortedData,
} from "../../../../../../utils/donnees-ecofi/donnees-ecofi";
import LoadSpinner from "../../../../../shared/LoadSpinner";
import Value from "../../../../../shared/Value";
import NonBorderedTable from "../../../SharedComponents/NonBorderedTable/NonBorderedTable";
import { useFinanceData, useFinanceDataApiEntreprise } from "./Finances.gql";
import FinancesGraph from "./FinancesGraph";

const getKey = (label, donneeEcofi) =>
  `${label}-${getDateDeclaration(donneeEcofi)}`;

const Finances = ({ siret, siren }) => {
  const { loading, data, error } = useFinanceData(siren);
  const { data: donneesEcofiApi } = useFinanceDataApiEntreprise(siret);
  let donneesEcofiBce = [];

  let hasBilan_K = false;
  if (loading) {
    return <LoadSpinner />;
  }

  if (error) {
    return <Value value={error} />;
  }
  if (data) {
    donneesEcofiBce = data.donneesEcofiBce;
    hasBilan_K = data?.bilan_K.length > 0;
  }

  let dates = [];
  let caList = [];
  let datesApi = [];
  let caListApi = [];
  let margeBrute = [];
  let EBE = [];
  let resultats = [];
  let resultExploi = [];

  if (donneesEcofiBce?.length > 0) {
    const donneesEcofi = concatApiEntrepriseBceData(
      donneesEcofiBce,
      donneesEcofiApi
    );
    const orderedData = sortedData(donneesEcofi);
    dates = orderedData?.map((donneeEcofi) => {
      return (
        <th
          className="has-text-right"
          key={getKey("data.date_fin_exercice", donneeEcofi)}
        >
          <Value value={getDateDeclaration(donneeEcofi)} empty="-" />
        </th>
      );
    });
    caList = orderedData?.map((donneeEcofi) => {
      return (
        <td className="has-text-right" key={getKey("data.ca", donneeEcofi)}>
          <Value
            isApi={donneeEcofi?.isFromApiEntreprise}
            value={getFormattedChiffreAffaire(donneeEcofi)}
            empty={"-"}
          />
        </td>
      );
    });

    margeBrute = orderedData?.map((donneeEcofi) => {
      return (
        <td className="has-text-right" key={getKey("Marge_brute", donneeEcofi)}>
          <Value value={getFormattedMargeBrute(donneeEcofi)} empty="-" />
        </td>
      );
    });

    EBE = orderedData?.map((donneeEcofi) => {
      return (
        <td className="has-text-right" key={getKey("EBE", donneeEcofi)}>
          <Value value={getFormattedEBE(donneeEcofi)} empty="-" />
        </td>
      );
    });

    resultExploi = orderedData?.map((donneeEcofi) => {
      return (
        <td className="has-text-right" key={getKey("EBIT", donneeEcofi)}>
          <Value value={getFormattedEBIT(donneeEcofi)} empty="-" />
        </td>
      );
    });
    resultats = orderedData?.map((donneeEcofi) => {
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
  if (donneesEcofiBce?.length === 0) {
    datesApi = donneesEcofiApi?.map((donneeEcofi) => {
      return (
        <th
          className="has-text-right"
          key={getKey("data.date_fin_exercice", donneeEcofi?.data)}
        >
          <Value value={getDateDeclaration(donneeEcofi?.data)} empty="-" />
        </th>
      );
    });
    caListApi = donneesEcofiApi?.map((donneeEcofi) => {
      return (
        <td
          className="has-text-right"
          key={getKey("data.ca", donneeEcofi.data)}
        >
          <Value
            isApi
            value={getFormattedChiffreAffaire(donneeEcofi.data)}
            empty="-"
          />
        </td>
      );
    });
  }
  return (
    <>
      {hasBilan_K && (
        <span className="text">
          Cette entreprise déclare un bilan consolidé, voir sur{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href={`https://annuaire-entreprises.data.gouv.fr/donnees-financieres/${siren}`}
          >
            l’Annuaire des Entreprises
          </a>
        </span>
      )}
      {donneesEcofiBce?.length > 0 ? (
        <>
          <div className="data-sheet--table">
            <NonBorderedTable>
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
              </tbody>
            </NonBorderedTable>
          </div>
          <div className="box-shadow">
            <FinancesGraph
              data={concatApiEntrepriseBceData(
                donneesEcofiBce,
                donneesEcofiApi
              )}
            />
          </div>
        </>
      ) : donneesEcofiBce.length === 0 && donneesEcofiApi ? (
        <>
          <NonBorderedTable>
            <thead>
              <tr>
                <th>Date fin exercice</th>
                {datesApi}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Chiffre d{"'"}affaires (€)</th>
                {caListApi}
              </tr>
            </tbody>
          </NonBorderedTable>
          <div className="box-shadow">
            <FinancesGraph data={donneesEcofiApi} isDataApi={true} />
          </div>
        </>
      ) : (
        <p className="enterprise-finances__not-available has-text-centered">
          Non disponible
        </p>
      )}
    </>
  );
};

Finances.propTypes = {
  siren: PropTypes.string.isRequired,
  siret: PropTypes.string.isRequired,
};

export default renderIfSiren(Finances);
