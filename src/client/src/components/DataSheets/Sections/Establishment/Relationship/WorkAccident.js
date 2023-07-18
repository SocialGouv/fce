import "./psi.scss";

import PropTypes from "prop-types";
import React from "react";

import { useAccidentTravailBySiret } from "../../../../../services/AccidentTravail/hooks";
import Data from "../../SharedComponents/Data";
import PgApiDataHandler from "../../SharedComponents/PgApiDataHandler";
import Subcategory from "../../SharedComponents/Subcategory";

const WorkAccident = ({ siret }) => {
  const { loading, data, error } = useAccidentTravailBySiret(siret);

  return (
    <div id="work-accidents" className="work-accidents">
      <Subcategory
        subtitle="Accidents du travail"
        sourceCustom="DGT / WikiT - 01/10/2021"
      >
        <PgApiDataHandler isLoading={loading} error={error}>
          <div className="section-datas__list ">
            <Data
              name={
                "Déclaration d'accident du travail professionnel au cours des 36 derniers mois"
              }
              description={
                <span className="psi__desc">
                  Déclaration(s) enregistrée(s) entre le 1er juillet 2018 et le
                  30 juin 2021 concernant les accidents de travail
                  professionnel, à l&apos;exclusion des accidents de trajet
                </span>
              }
              className="has-no-border"
              columnClasses={["is-6", "is-6", "psi__value"]}
              value={data?.accidents_travail?.length ? "Oui" : "Aucune"}
            />
            {data?.accidents_travail?.length > 0 && (
              <>
                <Data
                  name={"Nombre total d'accidents du travail déclaré"}
                  className="has-no-border"
                  columnClasses={["is-6", "is-6", "psi__value"]}
                  value={data.accidents_travail[0]?.total}
                />
                <Data
                  name={"Dont nombre d'accidents du travail mortels"}
                  className="has-no-border list-item"
                  columnClasses={["is-6", "is-6", "psi__value"]}
                  value={data.accidents_travail[0]?.mortels}
                />
                <Data
                  name={
                    "Dont nombre d'accidents du travail avec arrêt de travail"
                  }
                  className="has-no-border list-item"
                  columnClasses={["is-6", "is-6", "psi__value"]}
                  value={data.accidents_travail[0]?.avec_arret_travail}
                />
                <Data
                  name={
                    "Dont nombre d'accidents du travail sans arrêt de travail"
                  }
                  className="has-no-border list-item"
                  columnClasses={["is-6", "is-6", "psi__value"]}
                  value={data.accidents_travail[0]?.sans_arret_travail}
                />
              </>
            )}
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
