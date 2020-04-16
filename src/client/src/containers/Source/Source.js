import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SourceView from "../../components/Source";

const Source = ({
  sources,
  si = null,
  isTableCell = false,
  sourceDate = null,
  sourceCustom = null
}) => {
  console.log({ sourceCustom });
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
    sources
  };
};

Source.propTypes = {
  sources: PropTypes.object.isRequired,
  si: PropTypes.string,
  sourceCustom: PropTypes.string,
  isTableCell: PropTypes.bool,
  sourceDate: PropTypes.string
};

export default connect(mapStateToProps)(Source);
