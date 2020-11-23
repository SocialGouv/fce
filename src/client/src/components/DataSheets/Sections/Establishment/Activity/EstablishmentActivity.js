import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faSpinner } from "@fortawesome/pro-solid-svg-icons";
import Config from "../../../../../services/Config";
import { getSuccession } from "../../../../../helpers/Establishment";
import { getMonthName } from "../../../../../helpers/Date";
import Subcategory from "../../SharedComponents/Subcategory";
import AllEffectifsEtp from "../../../../../containers/AllEffectifsEtpButton";
import AllEffectifsDsn from "../../../../../containers/AllEffectifsDsnButton";
import Table from "../../SharedComponents/Table";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";

import "./establishmentActivity.scss";

const EstablishmentActivity = ({ establishment }) => {
  const [allEffectifsEtp, setAllEffectifsEtp] = useState(null);
  const [allEffectifDsn, setAllEffectifsDsn] = useState(null);

  const succession = getSuccession(
    establishment.successeur,
    establishment.predecesseur
  );

  const isLoadingEffectifMensuelEtp = !establishment.effectifMensuelEtp;
  const effectifEtpData = allEffectifsEtp ?? establishment.effectifMensuelEtp;
  const showEffectifEtpButton =
    Array.isArray(establishment.effectifMensuelEtp) &&
    establishment.effectifMensuelEtp.length > 0 &&
    !allEffectifsEtp;

  const EffectifEtpDataComponents = !!effectifEtpData?.length
    ? effectifEtpData.map(({ annee, mois, effectifs_mensuels }) => ({
        name: `Effectif ETP ${getMonthName(mois)}`,
        value: effectifs_mensuels,
        nonEmptyValue: "",
        sourceCustom: `Acoss / DSN ${getMonthName(mois)} ${annee}`,
        hasNumberFormat: true
      }))
    : [
        {
          name: `Effectif ETP`
        }
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
        <Subcategory
          subtitle="Lien de succession"
          datas={[
            {
              name: succession && succession.label,
              value: succession.datas && succession.datas.siret,
              emptyValue: "pas de prédecesseur ou de successeur",
              nonEmptyValue: "",
              link: succession.datas
                ? "/establishment/" + succession.datas.siret
                : null
            },
            {
              name: "Date du transfert",
              value: succession.datas && succession.datas.date_transfert,
              emptyValue: "-",
              nonEmptyValue: ""
            }
          ]}
          sourceSi="Sirène"
        />
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
                    )
                  }
                ]
              : EffectifEtpDataComponents)
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
                {allEffectifDsn.map(effectif => (
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
              value:
                Array.isArray(establishment.interactions_3E) &&
                establishment.interactions_3E.length &&
                establishment.interactions_3E[0].filiere,
              nonEmptyValue: ""
            },
            {
              name: "ETI / PEPITE",
              value:
                Array.isArray(establishment.interactions_3E) &&
                establishment.interactions_3E.length &&
                establishment.interactions_3E[0].eti_pepite,
              nonEmptyValue: ""
            },
            {
              name: "Adhérent à un pole de compétitivité",
              value:
                Array.isArray(establishment.pole_competitivite) &&
                !!establishment.pole_competitivite.length,
              nonEmptyValue: ""
            }
          ]}
          sourceSi="EOS-monthYear"
        />
        {Array.isArray(establishment.pole_competitivite) &&
          !!establishment.pole_competitivite.length && (
            <ul>
              {establishment.pole_competitivite.map(pole => (
                <li key={pole}>- {pole}</li>
              ))}
            </ul>
          )}
      </div>
    </section>
  );
};

EstablishmentActivity.propTypes = {
  establishment: PropTypes.object.isRequired
};

export default EstablishmentActivity;
