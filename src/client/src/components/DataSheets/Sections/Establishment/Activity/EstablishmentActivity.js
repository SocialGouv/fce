import "./establishmentActivity.scss";

import { faHistory, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { entries, groupBy, map, pipe } from "lodash/fp";
import PropTypes from "prop-types";
import React, { useState } from "react";

import AllEffectifsDsn from "../../../../../containers/AllEffectifsDsnButton";
import AllEffectifsEtp from "../../../../../containers/AllEffectifsEtpButton";
import { getMonthName } from "../../../../../helpers/Date";
import Config from "../../../../../services/Config";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table";
import SuccessionData from "./SuccessionData";

const isSuccesseur = (siret) => (succession) =>
  siret === succession.siretetablissementsuccesseur;

const getSuccessionsValue = (successions, isSuccesseur) =>
  successions.map(
    ({
      dateliensuccession,
      siretetablissementpredecesseur,
      siretetablissementsuccesseur,
    }) => {
      const otherEstablishementSiret = isSuccesseur
        ? siretetablissementpredecesseur
        : siretetablissementsuccesseur;

      return {
        date: dateliensuccession,
        link: `/establishment/${otherEstablishementSiret}`,
        siret: otherEstablishementSiret,
      };
    }
  );

const getSuccessionsData = (successions, siret) =>
  successions.successions.length === 0
    ? [
        {
          name: "SIRET prédecesseur ou successeur",
          values: [
            {
              siret: "pas de prédecesseur ou de successeur",
            },
          ],
        },
      ]
    : pipe(
        groupBy(isSuccesseur(siret)),
        entries,
        map(([isSuccesseur, successions]) => ({
          name: `${
            isSuccesseur === "true" ? "SIRET prédecesseur" : "SIRET successeur"
          }${successions.length > 1 ? "s" : ""}`,
          values: getSuccessionsValue(successions, isSuccesseur === "true"),
        }))
      )(successions.successions);

const EstablishmentActivity = ({ establishment, successions }) => {
  const [allEffectifsEtp, setAllEffectifsEtp] = useState(null);
  const [allEffectifDsn, setAllEffectifsDsn] = useState(null);

  const successionsData = getSuccessionsData(successions, establishment.siret);

  const isLoadingEffectifMensuelEtp = !establishment.effectifMensuelEtp;
  const effectifEtpData = allEffectifsEtp ?? establishment.effectifMensuelEtp;
  const showEffectifEtpButton =
    Array.isArray(establishment.effectifMensuelEtp) &&
    establishment.effectifMensuelEtp.length > 0 &&
    !allEffectifsEtp;

  const EffectifEtpDataComponents = effectifEtpData?.length
    ? effectifEtpData.map(({ annee, mois, effectifs_mensuels }) => ({
        hasNumberFormat: true,
        name: `Effectif ETP ${getMonthName(mois)}`,
        nonEmptyValue: "",
        sourceCustom: `Acoss / DSN ${getMonthName(mois)} ${annee}`,
        value: effectifs_mensuels,
      }))
    : [
        {
          name: `Effectif ETP`,
        },
      ];
  return (
    <section id="activity" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faHistory} />
        </span>
        <h2 className="title">Activité</h2>
      </div>
      <div className="section-datas">
        <Subcategory subtitle="Lien de succession" sourceSi="Sirène">
          {successionsData.map(({ name, values }) => (
            <SuccessionData key={name} name={name} values={values} />
          ))}
        </Subcategory>
        <Subcategory
          className="effectifs-establishment"
          subtitle="Effectifs"
          datas={[
            ...(isLoadingEffectifMensuelEtp
              ? [
                  {
                    name: `Effectif ETP`,

                    value: (
                      <div>
                        <span>Chargement en cours </span>
                        <FontAwesomeIcon icon={faSpinner} spin />
                      </div>
                    ),
                  },
                ]
              : EffectifEtpDataComponents),
          ]}
        >
          <Data
            name="Tranche Effectif INSEE"
            value={
              Config.get("inseeSizeRanges")[
                establishment.tranche_effectif_insee
              ]
            }
            nonEmptyValue=""
            sourceSi="Sirène-year"
            sourceDate={establishment.annee_tranche_effectif_insee}
          />
          <Data
            name="Effectif physique"
            value={establishment.dernier_effectif_physique}
            nonEmptyValue=""
            sourceSi="DSN"
            hasNumberFormat={true}
          />
          {!allEffectifDsn && (
            <AllEffectifsDsn
              type="etablissement"
              identifier={establishment.siret}
              setAllEffectifsDsn={setAllEffectifsDsn}
            />
          )}
          {allEffectifDsn && (
            <Table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Effectif Total</th>
                  <th>Homme</th>
                  <th>Femme</th>
                  <th>CDD</th>
                  <th>CDI</th>
                  <th>Total Interim</th>
                  <th>CDI Inter</th>
                  <th>Inter mission</th>
                </tr>
              </thead>
              <tbody>
                {allEffectifDsn.map((effectif) => (
                  <tr key={`effectif-${effectif?.id}`}>
                    <td>{effectif?.mois}</td>
                    <td>
                      <Value value={effectif?.eff} empty="-" />
                    </td>
                    <td>
                      <Value value={effectif?.hommes} empty="-" />
                    </td>
                    <td>
                      <Value value={effectif?.femmes} empty="-" />
                    </td>
                    <td>
                      <Value value={effectif?.cdd} empty="-" />
                    </td>
                    <td>
                      <Value value={effectif?.cdi} empty="-" />
                    </td>
                    <td>
                      <Value value={effectif?.interim} empty="-" />
                    </td>
                    <td>
                      <Value value={effectif?.cdi_inter} empty="-" />
                    </td>
                    <td>
                      <Value value={effectif?.inter_mission} empty="-" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Subcategory>
        {showEffectifEtpButton && (
          <AllEffectifsEtp
            type="etablissement"
            identifier={establishment.siret}
            setAllEffectifsEtp={setAllEffectifsEtp}
          />
        )}
        <Subcategory
          subtitle="Développement économique"
          datas={[
            {
              name: "Filière stratégique",
              nonEmptyValue: "",
              value:
                Array.isArray(establishment.interactions_3E) &&
                establishment.interactions_3E.length &&
                establishment.interactions_3E[0].filiere,
            },
            {
              name: "ETI / PEPITE",
              nonEmptyValue: "",
              value:
                Array.isArray(establishment.interactions_3E) &&
                establishment.interactions_3E.length &&
                establishment.interactions_3E[0].eti_pepite,
            },
            {
              name: "Adhérent à un pole de compétitivité",
              nonEmptyValue: "",
              value:
                Array.isArray(establishment.pole_competitivite) &&
                !!establishment.pole_competitivite.length,
            },
          ]}
          sourceSi="EOS-monthYear"
        />
        {Array.isArray(establishment.pole_competitivite) &&
          !!establishment.pole_competitivite.length && (
            <ul>
              {establishment.pole_competitivite.map((pole) => (
                <li key={pole}>- {pole}</li>
              ))}
            </ul>
          )}
      </div>
    </section>
  );
};

EstablishmentActivity.propTypes = {
  establishment: PropTypes.object.isRequired,
  successions: PropTypes.array.isRequired,
};

export default EstablishmentActivity;
