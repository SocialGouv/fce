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
        departement: null,
        siren: null,
        raisonSociale: null,
        interactions: [],
        siegeSocial: null
      },
      hasError: false,
      errorMessage: null,
      searchLoading: false,
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
    this.setState({ hasError: false, searchLoading: true, errorMessage: null });

    const nbTermsCompleted = () =>
      Object.keys(this.state.terms).filter(term =>
        Array.isArray(this.state.terms[term])
          ? this.state.terms[term].length
          : this.state.terms[term]
      ).length;

    const isValidSearch = () => {
      const nbTerms = nbTermsCompleted();
      const { terms } = { ...this.state };

      if (nbTerms === 1) {
        return !(
          terms.siegeSocial ||
          terms.interactions.length ||
          terms.departement
        );
      }
      if (nbTerms === 2) {
        return !(
          (terms.siegeSocial && terms.interactions.length) ||
          (terms.siegeSocial && terms.departement) ||
          (terms.interactions.length && terms.departement)
        );
      }
      if (nbTerms === 3) {
        return !(
          terms.siegeSocial &&
          terms.interactions.length &&
          terms.departement
        );
      }
      return true;
    };

    if (!isValidSearch()) {
      this.setState({
        hasError: true,
        searchLoading: false,
        errorMessage:
          "Votre recherche n'est pas assez précise, veuillez choisir d'autres filtres"
      });
      return false;
    }

    this.props
      .advancedSearch(this.state.terms)
      .then(response => {
        this.setState({
          hasError: false,
          searchLoading: false,
          redirectTo:
            response.data.results.length === 1 &&
            response.data.results[0].etablissements.length === 1
              ? `/establishment/${
                  response.data.results[0].etablissements[0].siret
                }`
              : "/search/results"
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          hasError: true,
          searchLoading: false,
          errorMessage: "La recherche a échouée"
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
        searchLoading={this.state.searchLoading}
        hasError={this.state.hasError}
        errorMessage={this.state.errorMessage}
        terms={this.state.terms}
      />
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    advancedSearch: terms => {
      return dispatch(advancedSearch(terms));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedSearch);
