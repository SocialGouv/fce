import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SearchView from "../../components/Search";
import { search } from "../../services/Store/actions";

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

    this.props.search(this.state.term).then(response => {
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
