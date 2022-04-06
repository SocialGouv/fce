import "./psi.scss";

import PropTypes from "prop-types";
import React from "react";

import { useAccidentTravailBySiret } from "../../../../../services/AccidentTravail/hooks";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import PgApiDataHandler from "../../SharedComponents/PgApiDataHandler";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table";

const WorkAccident = ({ siret }) => {
  const { loading, data, error } = useAccidentTravailBySiret(siret);

  return (
    <div id="work-accidents">
      <Subcategory
        subtitle="Accidents du travail"
        sourceCustom="DGT / WikiT - 01/10/2021"
      >
        <PgApiDataHandler isLoading={loading} error={error}>
          <div className="section-datas__list">
            <Data
              name={
                "Déclaration d'accident du travail professionnel au cours des 36 derniers mois"
              }
              description={
                <p className={"psi__description"}>
                  Déclaration(s) enregistrée(s) entre le 1er juillet 2018 et le
                  30 juin 2021 concernant les accidents de travail
                  professionnel, à l&apos;exclusion des accidents de trajet
                </p>
              }
              columnClasses={["is-10", "is-2"]}
              value={data?.accidents_travail?.length ? "Oui" : "Aucune"}
            />
            <div className="section-datas__list-item">
              {data?.accidents_travail?.length > 0 && (
                <Table>
                  <tbody>
                    <tr>
                      <td>
                        <Value value="Nombre total d'accidents du travail déclaré" />
                      </td>
                      <td>
                        <Value value={data.accidents_travail[0].total} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Value value="Dont nombre d'accidents du travail mortels" />
                      </td>
                      <td>
                        <Value value={data.accidents_travail[0].mortels} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Value value="Dont nombre d'accidents du travail avec arrêt de travail" />
                      </td>
                      <td>
                        <Value
                          value={data.accidents_travail[0].avec_arret_travail}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Value value="Dont nombre d'accidents du travail sans arrêt de travail" />
                      </td>
                      <td>
                        <Value
                          value={data.accidents_travail[0].sans_arret_travail}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        </PgApiDataHandler>
      </Subcategory>
    </div>
  );
};

WorkAccident.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default WorkAccident;
