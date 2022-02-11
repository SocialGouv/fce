import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

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
import EstablishmentView from "./Establishment";

const LegacyEnterprise = ({
  match,
  history,
  currentEnterprise,
  apprentissage,
  successions,
  loadEstablishment,
  loadAgreements,
  loadApprentissage,
  loadPsi,
  loadSources,
  loadSuccessions,
}) => {
  const [state, setState] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");

  const identifier = match.params.siret;

  useEffect(() => {
    const loadEntity = (identifier) => {
      setState(Config.get("state.loading"));
      loadSources();
      loadAgreements(identifier);
      loadPsi(identifier);

      return loadEstablishment(identifier)
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

    loadEntity(identifier);
    setCurrentUrl(match.url);

    loadApprentissage(identifier);
    loadSuccessions(identifier);
  }, [
    identifier,
    match,
    loadEstablishment,
    currentEnterprise.siren,
    currentUrl,
    loadAgreements,
    loadApprentissage,
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
  const establishment = getEstablishment(currentEnterprise, identifier);

  const isLoadedEstablishment = () =>
    !!(state === Config.get("state.success") && establishment);

  return (
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

LegacyEnterprise.propTypes = {
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
  successions: PropTypes.array.isRequired,
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
  connect(mapStateToProps, mapDispatchToProps)(LegacyEnterprise)
);
