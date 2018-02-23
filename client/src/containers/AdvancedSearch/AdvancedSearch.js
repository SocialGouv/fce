import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AdvancedSearchView from "../../components/AdvancedSearch";
import { advancedSearch } from "../../services/Store/actions";

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: {
        naf: null,
        commune: null,
        codePostal: null,
        departement: null
      },
      hasError: false,
      errorMessage: null,
      loading: false,
      redirectTo: false
    };
  }

  updateForm = (name, value) => {
    let terms = { ...this.state.terms };
    terms[name] = value;

    this.setState({
      terms: terms
    });
  };

  search = evt => {
    evt && evt.preventDefault();
    this.setState({ hasError: false, loading: true, errorMessage: null });

    const nbTermsCompleted = () =>
      Object.keys(this.state.terms).filter(x => this.state.terms[x]).length;

    if (!nbTermsCompleted()) {
      this.setState({
        hasError: true,
        loading: false,
        errorMessage: "Vous devez renseigner au moins un champ"
      });
      return false;
    }

    this.props.advancedSearch(this.state.terms).then(response => {
      this.setState({
        hasError: false,
        loading: false,
        redirectTo:
          response.data.results.length === 1 ? "/enterprise" : "/search/results"
      });
    });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect push to={this.state.redirectTo} />;
    }

    return (
      <AdvancedSearchView
        search={this.search}
        updateForm={this.updateForm}
        loading={this.state.loading}
        hasError={this.state.hasError}
        errorMessage={this.state.errorMessage}
        autocompleteData={this.props.autocompleteData}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    autocompleteData: {
      naf: state.common.naf,
      communes: state.common.communes,
      codePostaux: state.common.codePostaux,
      departements: state.common.departements
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    advancedSearch: terms => {
      return dispatch(advancedSearch(terms));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch);
