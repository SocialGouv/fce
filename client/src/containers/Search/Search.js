import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SearchView from "../../components/Search";
import { search, setCurrentEnterprise } from "../../services/Store/actions";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      hasError: false,
      loading: false,
      redirectTo: false
    };
  }

  updateForm = evt => {
    const target = evt.target;

    this.setState({
      [target.name]: target.value
    });
  };

  search = evt => {
    evt && evt.preventDefault();
    this.setState({ hasError: false, loading: true });

    this.props
      .search(this.state.term)
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
          redirectTo = `/enterprise/${results[0].siren}`;
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
