import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  resetSearch,
  setSearchFilters,
  setSearchTerm,
} from "../../../../../services/Store/actions";
import { getName, getSiren } from "../../../../../utils/entreprise/entreprise";
import Download from "../../../../shared/Icons/Download.jsx";
import Value from "../../../../shared/Value";
import { useEstablishmentHeaderNumData } from "../../Establishment/Header/EstablishmentHeader.gql";
import HeaderInfoBloc from "../../Establishment/Header/HeaderInfoBloc.jsx";

const EnterpriseHeader = ({ enterprise }) => {
  const { data: etablissementCount } = useEstablishmentHeaderNumData(
    getSiren(enterprise)
  );

  return (
    <section id="header" className="data-sheet-header">
      <>
        <Helmet>
          <title>FCE - entreprise {getName(enterprise) || ""}</title>
        </Helmet>

        <h1 className="data-sheet-header__title">
          <Value value={getName(enterprise) || null} empty=" " />
        </h1>
      </>

      <HeaderInfoBloc
        infoBoxValue={"Entreprise"}
        enterprise={enterprise}
        etablissementCount={etablissementCount}
      />

      <div className="columns">
        <div className="column ">
          <div className="data-sheet-header__bloc">
            <span className="data-sheet-header__bloc_link">
              <Download />
              <a
                href={`https://annuaire-entreprises.data.gouv.fr/justificatif-immatriculation-pdf/${enterprise.siren}`}
                rel="noreferrer noopener"
                target="_blank"
              >
                {
                  " Télécharger le justificatif d’immatriculation sur l'Annuaire des entreprises"
                }
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

EnterpriseHeader.propTypes = {
  enterprise: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetSearch: () => {
      dispatch(resetSearch());
    },
    setSearchFilters: (filters) => {
      dispatch(setSearchFilters(filters));
    },
    setSearchTerm: (term) => {
      return dispatch(setSearchTerm(term));
    },
  };
};

export default withRouter(connect(null, mapDispatchToProps)(EnterpriseHeader));
