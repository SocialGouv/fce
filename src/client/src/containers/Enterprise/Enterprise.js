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
  loadSources,
  loadEstablishment,
  loadEntreprise
} from "../../services/Store/actions";

const Enterprise = ({
  match,
  history,
  currentEnterprise,
  loadEntreprise,
  loadEstablishment,
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
    if (state === Config.get("state.unauthorize")) {
      setCurrentUrl("/login");
    }
    if (mustLoadEntity(identifier)) {
      loadEntity(loadMethod, identifier);
      setCurrentUrl(match.url);
    }
  }, [match]);

  if (state === Config.get("state.error")) {
    return <Error404 />;
  }

  const loadEntity = (loadMethod, identifier) => {
    setState(Config.get("state.loading"));
    loadSources();
    return loadMethod(identifier)
      .then(() => {
        setState(Config.get("state.success"));
      })
      .catch(err => {
        if (err.response.status === 401) {
          setState(Config.get("state.unauthorize"));
        } else {
          setState(Config.get("state.error"));
        }
      });
  };

  const getEstablishment = (enterprise, searchSiret) =>
    enterprise.etablissements &&
    enterprise.etablissements.find(({ siret }) => siret === searchSiret);

  const getHeadOffice = enterprise =>
    enterprise.etablissements &&
    enterprise.etablissements.find(
      ({ siege_social, siret }) =>
        siege_social || siret === enterprise.siret_siege_social
    );

  const mustLoadEntity = identifier => {
    const nextUrl = match.url;

    if (identifier !== currentEnterprise.siren && currentUrl !== nextUrl) {
      return true;
    }

    return state !== Config.get("state.success");
  };

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
  hasSearchResults: PropTypes.bool,
  isLoaded: PropTypes.bool,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  currentEnterprise: PropTypes.object.isRequired,
  loadSources: PropTypes.func.isRequired,
  loadEstablishment: PropTypes.func.isRequired,
  loadEntreprise: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    currentEnterprise: state.enterprise.current
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
    loadSources: () => {
      return dispatch(loadSources());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Enterprise)
);
