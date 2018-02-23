import React, { Component } from "react";
import { connect } from "react-redux";
import SearchView from "../../components/Search";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      hasError: false,
      loading: false
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

    /*this.props
      .loginUser(this.state.term)
      .then(response => {
        this.setState({
          hasError: false,
          loading: false
        });
      });*/
  };

  render() {
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
