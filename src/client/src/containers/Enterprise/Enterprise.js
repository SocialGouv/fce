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

  const isEnterprise = Object.prototype.hasOwnProperty.call(
    match.params,
    "siren"
  );
  const identifier = isEnterprise ? match.params.siren : match.params.siret;
  const loadMethod = isEnterprise ? loadEntreprise : loadEstablishment;

  const loadEntity = (loadMethod, identifier) => {
    setState(Config.get("state.loading"));
    loadSources();
    return loadMethod(identifier)
      .then(() => {
        setState(Config.get("state.success"));
      })
      .catch(() => {
        setState(Config.get("state.error"));
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
    if (identifier !== currentEnterprise.siren) {
      return true;
    }

    return state !== Config.get("state.success");
  };

  useEffect(() => {
    if (mustLoadEntity(identifier)) {
      loadEntity(loadMethod, identifier);
    }
  }, [match]);

  if (state === Config.get("state.error")) {
    return <Error404 />;
  }

  return isEnterprise ? (
    <EnterpriseView
      enterprise={currentEnterprise}
      headOffice={getHeadOffice(currentEnterprise)}
      establishments={currentEnterprise.etablissements || []}
      isLoaded={state === Config.get("state.success")}
      history={history}
    />
  ) : (
    <EstablishmentView
      enterprise={currentEnterprise}
      headOffice={getHeadOffice(currentEnterprise)}
      establishment={getEstablishment(currentEnterprise, identifier)}
      establishments={currentEnterprise.etablissements || []}
      isLoaded={state === Config.get("state.success")}
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
