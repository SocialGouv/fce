import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SearchView from "../../components/Search";
import { search, setCurrentEnterprise } from "../../services/Store/actions";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: {
        q: "",
        siegeSocial: false
      },
      hasError: false,
      loading: false,
      redirectTo: false
    };
  }

  updateForm = evt => {
    const { name, value, type, checked } = evt.target;
    let terms = { ...this.state.terms };
    terms[name] = type === "checkbox" ? checked : value;

    this.setState({
      terms: terms
    });
  };

  search = evt => {
    evt && evt.preventDefault();
    this.setState({ hasError: false, loading: true });

    this.props
      .search(this.state.terms)
      .then(response => {
        const { query, results } = response.data;
        let redirectTo = "/search/results";

        if (query.isSIRET && results) {
          redirectTo = `/establishment/${query.q}`;
          this.props.setCurrentEnterprise(results[0]);
        } else if (query.isSIREN && results) {
          redirectTo = `/enterprise/${query.q}`;
          this.props.setCurrentEnterprise(results[0]);
        } else if (results && results.length === 1) {
          redirectTo = `/establishment/${results[0].etablissements[0].siret}`;
        }

        this.setState({
          hasError: false,
          loading: false,
          redirectTo
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
      <SearchView
        terms={this.state.terms}
        search={this.search}
        updateForm={this.updateForm}
        loading={this.state.loading}
        hasError={this.state.hasError}
      />
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
