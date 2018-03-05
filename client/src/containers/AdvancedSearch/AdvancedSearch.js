import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AdvancedSearchView from "../../components/AdvancedSearch";
import { advancedSearch, getNomenclatures } from "../../services/Store/actions";

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
      searchLoading: false,
      isLoadedNomenclatures: false,
      redirectTo: false
    };
  }

  componentDidMount() {
    this.loadNomenclatures();
  }

  loadNomenclatures() {
    if (
      this.props.autocompleteData &&
      this.props.autocompleteData.nafCodes &&
      this.props.autocompleteData.nafCodes.length
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
        term => term !== "naf" && this.state.terms[term]
      ).length;

    if (!this.state.terms.naf || !nbTermsCompleted()) {
      this.setState({
        hasError: true,
        searchLoading: false,
        errorMessage:
          "Vous devez renseigner un code NAF ainsi qu'un champ supplémentaire"
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
                  response.data.results.etablissements[0].siret
                }`
              : "/search/results"
        });
      })
      .catch(error => {
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
