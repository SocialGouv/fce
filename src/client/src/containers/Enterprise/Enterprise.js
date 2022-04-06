import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  Enterprise as EnterpriseView,
  Establishment as EstablishmentView,
} from "../../components/DataSheets";
import { Error404 } from "../../components/Errors";
import Config from "../../services/Config";
import {
  loadAgreements,
  loadEntreprise,
  loadEstablishment,
  loadPsi,
  loadSources,
  loadSuccessions,
} from "../../services/Store/actions";
import { loadApprentissage } from "../../services/Store/actions/apprentissage";
import { loadEgapro } from "../../services/Store/actions/egapro";

const Enterprise = ({
  match,
  history,
  currentEnterprise,
  apprentissage,
  successions,
  egapro,
  loadEntreprise,
  loadEstablishment,
  loadAgreements,
  loadApprentissage,
  loadPsi,
  loadSources,
  loadEgapro,
  loadSuccessions,
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
    const mustLoadEntity = (identifier) => {
      const nextUrl = match.url;

      if (identifier !== currentEnterprise.siren && currentUrl !== nextUrl) {
        return true;
      }

      return state !== Config.get("state.success");
    };

    const mustLoadPgApi = (identifier) => {
      const isNewSiren = identifier.slice(0, 9) !== currentEnterprise.siren;

      return isNewSiren;
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
        .catch((err) => {
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

    loadApprentissage(identifier);
    loadEgapro(currentEnterprise.siren);

    // if establishment, load successions
    if (!isEnterprise) {
      loadSuccessions(identifier);
    }
  }, [
    state,
    isEnterprise,
    identifier,
    match,
    loadMethod,
    currentEnterprise.siren,
    currentUrl,
    loadAgreements,
    loadApprentissage,
    loadEgapro,
    loadPsi,
    loadSources,
    loadSuccessions,
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

  const getHeadOffice = (enterprise) =>
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
      egapro={egapro}
    />
  ) : (
    <EstablishmentView
      enterprise={currentEnterprise}
      headOffice={headOffice}
      establishment={establishment}
      establishments={establishments}
      apprentissage={apprentissage}
      isLoaded={isLoadedEstablishment()}
      history={history}
      successions={successions}
    />
  );
};

Enterprise.propTypes = {
  agreements: PropTypes.object.isRequired,
  apprentissage: PropTypes.object.isRequired,
  currentEnterprise: PropTypes.object.isRequired,
  egapro: PropTypes.object.isRequired,
  hasSearchResults: PropTypes.bool,
  history: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool,
  loadAgreements: PropTypes.func.isRequired,
  loadApprentissage: PropTypes.func.isRequired,
  loadEgapro: PropTypes.func.isRequired,
  loadEntreprise: PropTypes.func.isRequired,
  loadEstablishment: PropTypes.func.isRequired,
  loadPsi: PropTypes.func,
  loadSources: PropTypes.func.isRequired,
  loadSuccessions: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  psi: PropTypes.object.isRequired,
  successions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    agreements: state.agreements,
    apprentissage: state.apprentissage.apprentissage,
    currentEnterprise: state.enterprise.current,
    egapro: state.egapro,
    psi: state.psi,
    successions: state.successions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadAgreements: (identifier) => dispatch(loadAgreements(identifier)),
  loadApprentissage: (identifier) => dispatch(loadApprentissage(identifier)),
  loadEgapro: (siren) => dispatch(loadEgapro(siren)),
  loadEntreprise: (siren) => dispatch(loadEntreprise(siren)),
  loadEstablishment: (siret) => dispatch(loadEstablishment(siret)),
  loadPsi: (identifier) => dispatch(loadPsi(identifier)),
  loadSources: () => dispatch(loadSources()),
  loadSuccessions: (siret) => dispatch(loadSuccessions(siret)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Enterprise)
);
