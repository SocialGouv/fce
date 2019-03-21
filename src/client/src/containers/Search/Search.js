import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SearchView from "../../components/Search";
import { search, setCurrentEnterprise } from "../../services/Store/actions";
import Http from "../../services/Http";
import Config from "../../services/Config";
import SearchResults from "../../containers/SearchResults";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: {
        q: "",
        siegeSocial: false,
        naf: null,
        commune: null
      },
      nafList: [],
      hasError: false,
      loading: false,
      redirectTo: false,
      showResults: false
    };
  }

  componentDidMount() {
    this.loadNaf();
  }

  updateForm = evt => {
    const { name, value, type, checked } = evt.target;
    let terms = { ...this.state.terms };
    terms[name] = type === "checkbox" ? checked : value;

    this.setState({
      terms: terms
    });
  };

  updateFormSelect = (name, element) => {
    let terms = { ...this.state.terms };

    if (Array.isArray(element)) {
      terms[name] = element.map(el => el.value);
    } else {
      terms[name] = element && element.value;
    }

    this.setState({
      terms: terms
    });
  };

  loadNaf = () => {
    return Http.get("/naf")
      .then(response => {
        if (response.data && response.data.results) {
          const nafList = response.data.results.map(naf => {
            return {
              label: `${naf.code} - ${naf.libelle}`,
              value: naf.code
            };
          });
          this.setState({
            nafList
          });
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  loadCommunes = term => {
    if (term.length < Config.get("advancedSearch").minTerms) {
      return new Promise(resolve => {
        resolve([]);
      });
    }

    return Http.get("/communes", {
      params: {
        q: term
      }
    })
      .then(response => {
        if (response.data && response.data.results) {
          return Promise.resolve(
            response.data.results.map(commune => {
              return {
                label: `${commune.nom} (${commune.code_postal})`,
                value: commune.code_insee
              };
            })
          );
        }
        return Promise.reject([]);
      })
      .catch(function(error) {
        console.error(error);
        return Promise.reject([]);
      });
  };

  search = evt => {
    evt && evt.preventDefault();
    this.setState({ hasError: false, loading: true });

    this.props
      .search(this.state.terms)
      .then(response => {
        const { query, results } = response.data;
        let redirectTo = false;
        let showResults = false;

        if (query.isSIRET && results) {
          redirectTo = `/establishment/${query.terms.q}`;
          this.props.setCurrentEnterprise(results[0]);
        } else if (query.isSIREN && results) {
          redirectTo = `/enterprise/${query.terms.q}`;
          this.props.setCurrentEnterprise(results[0]);
        } else if (results && results.length === 1) {
          redirectTo = `/establishment/${results[0].etablissements[0].siret}`;
        } else {
          showResults = true;
        }

        this.setState({
          hasError: false,
          loading: false,
          redirectTo,
          showResults
        });
      })
      .catch(
        function(error) {
          this.setState({
            hasError: true,
            loading: false
          });
        }.bind(this)
      );
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect push to={this.state.redirectTo} />;
    }

    return (
      <>
        <SearchView
          terms={this.state.terms}
          search={this.search}
          updateForm={this.updateForm}
          updateFormSelect={this.updateFormSelect}
          loading={this.state.loading}
          hasError={this.state.hasError}
          nafList={this.state.nafList}
          loadCommunes={this.loadCommunes}
        />
        {this.state.showResults ? <SearchResults /> : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    search: term => {
      return dispatch(search(term));
    },
    setCurrentEnterprise: enterprise => {
      return dispatch(setCurrentEnterprise(enterprise));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
