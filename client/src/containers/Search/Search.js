import React, { Component } from "react";
import { connect } from "react-redux";
import SearchView from "../../components/Search";

class Search extends Component {
  render() {
    return <SearchView />;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
