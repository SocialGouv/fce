import React from "react";
import { connect } from "react-redux";
import SearchResultsView from "../../components/SearchResults";

class SearchResults extends React.Component {
  render() {
    return <SearchResultsView results={this.props.results} />;
  }
}

const mapStateToProps = state => {
  return {
    results: state.search.results
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
