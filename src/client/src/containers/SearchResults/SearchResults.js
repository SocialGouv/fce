import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchResultsView from "../../components/SearchResults";
import { search } from "../../services/Store/actions";

class SearchResults extends React.Component {
  state = { loading: false };

  fetchData = (page, instance) => {
    this.setState({ loading: true });

    this.props.search(this.props.terms, page).then(response => {
      this.setState({ loading: false });
    });
  };

  render() {
    console.log(this.props);
    return (
      <SearchResultsView
        results={this.props.results}
        terms={this.props.terms}
        pagination={this.props.pagination}
        fetchData={this.fetchData}
        loading={this.state.loading}
        downloadXlsxExport={this.props.downloadXlsxExport}
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

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  terms: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
  downloadXlsxExport: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
