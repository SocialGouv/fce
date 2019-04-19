import React from "react";
import { connect } from "react-redux";
import AdminView from "../../components/Admin";
import Http from "../../services/Http";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      files: {},
      hasError: false,
      importResponses: {}
    };
  }

  handleFileUpload = e => {
    const target = e.target;
    const name = target.name;

    let files = { ...this.state.files };
    files[name] = target.files ? target.files[0] : null;

    this.setState({
      files
    });
  };

  submit = e => {
    e && e.preventDefault();
    this.setState({ importResponses: {}, hasError: false, loading: true });

    return Http.post("/upload", Http.formData(this.state.files))
      .then(response => {
        if (response.data.files) {
          this.setState({
            hasError: false,
            importResponses: response.data.files,
            loading: false
          });
        } else {
          this.setState({ hasError: true, loading: false });
        }
        return response;
      })
      .catch(error => {
        this.setState({ hasError: true, loading: false });
      });
  };

  render() {
    return (
      <AdminView
        submit={this.submit}
        handleFileUpload={this.handleFileUpload}
        hasError={this.state.hasError}
        importResponses={this.state.importResponses}
        loading={this.state.loading}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
