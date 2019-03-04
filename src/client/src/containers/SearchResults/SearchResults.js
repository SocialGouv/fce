import React from "react";
import { connect } from "react-redux";
import SearchResultsView from "../../components/SearchResults";
import { search } from "../../services/Store/actions";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  fetchData = (state, instance) => {
    const { page: pageIndex } = state;
    const page = pageIndex + 1;

    this.setState({ loading: true });

    this.props.search(this.props.terms.raisonSociale, page).then(response => {
      this.setState({ loading: false });
    });
  };

  render() {
    return (
      <SearchResultsView
        results={this.props.results}
        terms={this.props.terms}
        pagination={this.props.pagination}
        fetchData={this.fetchData}
        loading={this.state.loading}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.search.results,
    terms: state.search.terms,
    pagination: state.search.pagination
  };
};

const mapDispatchToProps = dispatch => {
  return {
    search: (term, page) => {
      return dispatch(search(term, page));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
