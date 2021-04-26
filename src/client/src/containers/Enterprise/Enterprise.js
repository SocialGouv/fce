import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Config from "../../services/Config";
import {
  Establishment as EstablishmentView,
  Enterprise as EnterpriseView
} from "../../components/DataSheets";
import { Error404 } from "../../components/Errors";
import {
  loadAgreements,
  loadPsi,
  loadSources,
  loadEstablishment,
  loadEntreprise
} from "../../services/Store/actions";

const Enterprise = ({
  match,
  history,
  currentEnterprise,
  agreements,
  psi,
  loadEntreprise,
  loadEstablishment,
  loadAgreements,
  loadPsi,
  loadSources
}) => {
  const [state, setState] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");

  const isEnterprise = Object.prototype.hasOwnProperty.call(
    match.params,
    "siren"
  );
  const identifier = isEnterprise ? match.params.siren : match.params.siret;
  const loadMethod = isEnterprise ? loadEntreprise : loadEstablishment;

  useEffect(() => {
    const mustLoadEntity = identifier => {
      const nextUrl = match.url;

      if (identifier !== currentEnterprise.siren && currentUrl !== nextUrl) {
        return true;
      }

      return state !== Config.get("state.success");
    };

    const mustLoadPgApi = identifier => {
      const isNewSiren = identifier.slice(0, 9) !== currentEnterprise.siren;
      const hasPgApiErrors = !!(agreements.error || psi.error);

      return isNewSiren || hasPgApiErrors;
    };

    const loadEntity = (loadMethod, identifier) => {
      setState(Config.get("state.loading"));
      loadSources();
      if (mustLoadPgApi(identifier)) {
        loadAgreements(identifier);
        loadPsi(identifier);
      }

      return loadMethod(identifier)
        .then(() => {
          setState(Config.get("state.success"));
        })
        .catch(err => {
          if (err.response?.status === 401) {
            setState(Config.get("state.unauthorize"));
          } else {
            setState(Config.get("state.error"));
          }
        });
    };

    if (mustLoadEntity(identifier)) {
      loadEntity(loadMethod, identifier);
      setCurrentUrl(match.url);
    }
  }, [
    identifier,
    match,
    loadMethod,
    agreements.error,
    psi.error,
    currentEnterprise.siren,
    currentUrl,
    loadAgreements,
    loadPsi,
    loadSources
  ]);

  useEffect(() => {
    if (state === Config.get("state.unauthorize")) {
      setCurrentUrl("/login");
      history.push("/login");
    }
  }, [state, history]);

  if (state === Config.get("state.error")) {
    return <Error404 />;
  }

  const getEstablishment = (enterprise, searchSiret) =>
    enterprise.etablissements &&
    enterprise.etablissements.find(({ siret }) => siret === searchSiret);

  const getHeadOffice = enterprise =>
    enterprise.etablissements &&
    enterprise.etablissements.find(
      ({ siege_social, siret }) =>
        siege_social || siret === enterprise.siret_siege_social
    );

  const headOffice = getHeadOffice(currentEnterprise);
  const establishments = currentEnterprise.etablissements || [];
  const establishment = isEnterprise
    ? null
    : getEstablishment(currentEnterprise, identifier);

  const isLoadedEnterprise = () =>
    !!(state === Config.get("state.success") && establishments.length);
  const isLoadedEstablishment = () =>
    !!(state === Config.get("state.success") && establishment);

  return isEnterprise ? (
    <EnterpriseView
      enterprise={currentEnterprise}
      headOffice={headOffice}
      establishments={establishments}
      isLoaded={isLoadedEnterprise()}
      history={history}
    />
  ) : (
    <EstablishmentView
      enterprise={currentEnterprise}
      headOffice={headOffice}
      establishment={establishment}
      establishments={establishments}
      isLoaded={isLoadedEstablishment()}
      history={history}
    />
  );
};

Enterprise.propTypes = {
  agreements: PropTypes.object.isRequired,
  psi: PropTypes.object.isRequired,
  currentEnterprise: PropTypes.object.isRequired,
  hasSearchResults: PropTypes.bool,
  history: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool,
  loadAgreements: PropTypes.func.isRequired,
  loadEntreprise: PropTypes.func.isRequired,
  loadEstablishment: PropTypes.func.isRequired,
  loadPsi: PropTypes.func,
  loadSources: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    currentEnterprise: state.enterprise.current,
    agreements: state.agreements,
    psi: state.psi
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadEstablishment: siret => {
      return dispatch(loadEstablishment(siret));
    },
    loadEntreprise: siren => {
      return dispatch(loadEntreprise(siren));
    },
    loadAgreements: identifier => {
      return dispatch(loadAgreements(identifier));
    },
    loadPsi: identifier => {
      return dispatch(loadPsi(identifier));
    },
    loadSources: () => {
      return dispatch(loadSources());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Enterprise)
);
