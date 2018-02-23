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
      loading: false,
      redirectTo: false
    };
  }

  updateForm = evt => {
    const target = evt.target;
    let form = { ...this.state.form };
    form[target.name] = target.value;

    this.setState({
      form
    });
  };

  search = evt => {
    evt && evt.preventDefault();
    this.setState({ hasError: false, loading: true });

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
      return <Redirect to={this.state.redirectTo} />;
    }

    return (
      <AdvancedSearchView
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
    advancedSearch: terms => {
      return dispatch(advancedSearch(terms));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch);
