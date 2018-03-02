import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  loadEstablishment,
  loadEntreprise
} from "../../services/Store/actions";
import {
  Establishment as EstablishmentView,
  Enterprise as EnterpriseView
} from "../../components/Enterprise";

class Enterprise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnterprise: this.props.match.params.hasOwnProperty("siren"),
      enterprise: null,
      headOffice: null,
      establishment: null,
      establishments: null,
      isLoaded: false,
      redirectTo: false
    };
  }

  componentDidMount() {
    if (!this.loadEntityByStore()) {
      this.loadEntityByApi();
    }
  }

  loadEntityByStore = () => {
    if (this.state.isEnterprise) {
      return this.loadEnterpriseByStore(this.props.match.params.siren);
    }
    return this.loadEstablishmentByStore(this.props.match.params.siret);
  };

  loadEstablishmentByStore = siret => {
    let establishment = null;

    if (
      this.props.currentEnterprise &&
      this.props.currentEnterprise.etablissements &&
      this.props.currentEnterprise._dataSources.ApiGouv
    ) {
      establishment = this.props.currentEnterprise.etablissements.find(
        establishment => {
          return establishment.siret === siret;
        }
      );
    }

    if (establishment) {
      return this.initData(this.props.currentEnterprise, establishment);
    }

    return false;
  };

  loadEnterpriseByStore = siren => {
    if (
      this.props.currentEnterprise &&
      this.props.currentEnterprise.siren === siren &&
      this.props.currentEnterprise._dataSources.ApiGouv
    ) {
      return this.initData(this.props.currentEnterprise, null);
    }

    return false;
  };

  loadEntityByApi = () => {
    if (this.state.isEnterprise) {
      return this.loadEnterpriseByApi(this.props.match.params.siren);
    }
    return this.loadEstablishmentByApi(this.props.match.params.siret);
  };

  loadEstablishmentByApi = siret => {
    this.props
      .loadEstablishment(siret)
      .then(response => {
        const { results } = response.data;

        if (results.length) {
          this.loadEstablishmentByStore(siret);
        } else {
          this.setState({
            redirectTo: "/404"
          });
        }
      })
      .catch(
        function(error) {
          this.setState({
            redirectTo: "/404"
          });
        }.bind(this)
      );
  };

  loadEnterpriseByApi = siren => {
    this.props
      .loadEntreprise(siren)
      .then(response => {
        const { results } = response.data;

        if (results.length) {
          this.loadEnterpriseByStore(siren);
        } else {
          this.setState({
            redirectTo: "/404"
          });
        }
      })
      .catch(
        function(error) {
          this.setState({
            redirectTo: "/404"
          });
        }.bind(this)
      );
  };

  initData = (enterprise, establishment) => {
    const headOffice = enterprise.etablissements.find(establishment => {
      return establishment.siege_social === true;
    });

    this.setState({
      enterprise,
      headOffice: headOffice || {},
      establishment,
      establishments: enterprise.etablissements,
      isLoaded: true
    });

    return true;
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect push to={this.state.redirectTo} />;
    }

    return this.state.isEnterprise ? (
      <EnterpriseView
        enterprise={this.state.enterprise}
        headOffice={this.state.headOffice}
        establishments={this.state.establishments}
        isLoaded={this.state.isLoaded}
      />
    ) : (
      <EstablishmentView
        enterprise={this.state.enterprise}
        headOffice={this.state.headOffice}
        establishment={this.state.establishment}
        establishments={this.state.establishments}
        isLoaded={this.state.isLoaded}
      />
    );
  }
}

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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Enterprise);
