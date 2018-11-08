import React from "react";
import { connect } from "react-redux";
import SearchResultsView from "../../components/SearchResults";

class SearchResults extends React.Component {
  render() {
    return (
      <SearchResultsView
        results={this.props.results}
        terms={this.props.terms}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.search.results,
    terms: state.search.terms
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
