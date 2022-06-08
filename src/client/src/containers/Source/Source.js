import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import SourceView from "../../components/Source";

const Source = ({
  sources,
  si = null,
  isTableCell = false,
  sourceDate = null,
  sourceCustom = null,
}) => {
  const name = sourceCustom ? sourceCustom : sources[si] && sources[si].name;
  const updated = sourceDate || (sources[si] && sources[si].date);

  return (
    <SourceView
      name={name}
      updated={updated}
      isTableCell={isTableCell}
      isCustomSource={!!sourceCustom}
    />
  );
};

const mapStateToProps = ({ sources }) => {
  return {
    sources,
  };
};

Source.propTypes = {
  isTableCell: PropTypes.bool,
  si: PropTypes.string,
  sourceCustom: PropTypes.string,
  sourceDate: PropTypes.string,
  sources: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Source);
