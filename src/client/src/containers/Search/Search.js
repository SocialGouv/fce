import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SearchView from "../../components/Search";
import {
  search,
  setTerm,
  setCurrentEnterprise
} from "../../services/Store/actions";
import Http from "../../services/Http";
import Config from "../../services/Config";
import SearchResults from "../../containers/SearchResults";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nafList: [],
      hasError: false,
      loading: false,
      redirectTo: false,
      showResults: false
    };
  }

  componentDidMount() {
    if (this.hasPreviousTerms(this.props.terms)) {
      this.search();
    }
    this.loadNaf();
  }

  hasPreviousTerms = terms => {
    if (!terms) {
      return false;
    }
    return (
      Config.get("advancedSearch").terms.find(key => terms[key] !== null) !==
      undefined
    );
  };

  updateForm = evt => {
    const { name, value, type, checked } = evt.target;
    this.props.setTerm(name, type === "checkbox" ? checked : value);
  };

  updateFormSelect = (name, element) => {
    const value = Array.isArray(element)
      ? element.map(el => el.value)
      : element && element.value;

    this.props.setTerm(`_${name}Select`, element);
    this.props.setTerm(name, value);
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
    clearTimeout(this.loadCommunesTimer);

    if (term.length < Config.get("advancedSearch").minTerms) {
      return new Promise(resolve => {
        resolve([]);
      });
    }

    return new Promise((resolve, reject) => {
      return (this.loadCommunesTimer = setTimeout(() => {
        return Http.get("/communes", {
          params: {
            q: term
          }
        })
          .then(response => {
            if (response.data && response.data.results) {
              return resolve(
                response.data.results.map(commune => {
                  return {
                    label: `${
                      commune.nom
                    } (${commune.code_postal.trim().padStart(5, "0")})`,
                    value: commune.code_insee.trim().padStart(5, "0")
                  };
                })
              );
            }
            return reject([]);
          })
          .catch(function(error) {
            console.error(error);
            return reject([]);
          });
      }, Config.get("advancedSearch").debounce));
    });
  };

  search = evt => {
    evt && evt.preventDefault();
    this.setState({ hasError: false, loading: true });

    this.props
      .search(this.props.terms)
      .then(response => {
        const { query, results } = response.data;
        let redirectTo = false;
        let showResults = false;

        if (query.isSIRET && results) {
          redirectTo = `/establishment/${query.terms.q}`;
          this.props.setCurrentEnterprise(results[0]);
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
          terms={this.props.terms || {}}
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
  return {
    terms: state.search.terms
  };
};

const mapDispatchToProps = dispatch => {
  return {
    search: term => {
      return dispatch(search(term));
    },

    setTerm: (termKey, termValue) => {
      return dispatch(setTerm(termKey, termValue));
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
