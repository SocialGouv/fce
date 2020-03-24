import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SourceView from "../../components/Source";

const Source = ({ si, sources, isTableCell }) => {
  return (
    <SourceView
      name={sources[si] && sources[si].name}
      updated={sources[si] && sources[si].date}
      isTableCell={isTableCell}
    />
  );
};

const mapStateToProps = ({ sources }) => {
  return {
    sources
  };
};

Source.propTypes = {
  si: PropTypes.string,
  sources: PropTypes.object.isRequired,
  isTableCell: PropTypes.bool
};

export default connect(
  mapStateToProps,
  null
)(Source);
