import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Establishment as EstablishmentView } from "../../components/Enterprise";
import { loadEstablishment } from "../../services/Store/actions";

class Establishment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enterprise: null,
      headOffice: null,
      establishment: null,
      establishments: null,
      isLoaded: false,
      redirectTo: false
    };
  }

  componentDidMount() {
    if (!this.loadEstablishmentByStore(this.props.match.params.siret)) {
      this.loadEstablishmentByApi(this.props.match.params.siret);
    }
  }

  loadEstablishmentByStore = siret => {
    let establishment = null;

    if (
      this.props.currentEnterprise &&
      this.props.currentEnterprise.etablissements
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

  loadEstablishmentByApi = siret => {
    this.props.loadEstablishment(siret).then(response => {
      const { results } = response.data;

      if (results.length) {
        this.loadEstablishmentByStore(siret);
      } else {
        this.setState({
          redirectTo: "/404"
        });
      }
    });
  };

  initData = (enterprise, establishment) => {
    const headOffice = enterprise.etablissements.find(establishment => {
      return establishment.siege_social === true;
    });

    this.setState({
      enterprise,
      headOffice,
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

    return (
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Establishment);
