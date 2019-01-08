import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AdvancedSearchView from "../../components/AdvancedSearch";
import { advancedSearch, getNomenclatures } from "../../services/Store/actions";

const NOMENCLATURE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

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
      isLoadedNomenclatures: false,
      redirectTo: false
    };
  }

  componentDidMount() {
    this.loadNomenclatures();
  }

  loadNomenclatures() {
    const { autocompleteData: nomenclatures } = this.props;
    if (
      nomenclatures &&
      nomenclatures.nafCodes &&
      nomenclatures.nafCodes.length &&
      (nomenclatures.updated_at || 0) + NOMENCLATURE_TIMEOUT > +new Date()
    ) {
      this.setState({ isLoadedNomenclatures: true, hasError: false });
    } else {
      this.props
        .getNomenclatures()
        .then(response => {
          this.setState({
            isLoadedNomenclatures: true,
            hasError: false
          });
        })
        .catch(error => {
          this.setState({
            isLoadedNomenclatures: true,
            hasError: true,
            errorMessage: "Impossible de charger les nomenclatures"
          });
        });
    }
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
      Object.keys(this.state.terms).filter(
        term =>
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
        isLoaded={this.state.isLoadedNomenclatures}
        hasError={this.state.hasError}
        errorMessage={this.state.errorMessage}
        autocompleteData={this.props.autocompleteData}
        terms={this.state.terms}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    autocompleteData: state.search.nomenclatures
  };
};

const mapDispatchToProps = dispatch => {
  return {
    advancedSearch: terms => {
      return dispatch(advancedSearch(terms));
    },
    getNomenclatures: () => {
      return dispatch(getNomenclatures());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch);
