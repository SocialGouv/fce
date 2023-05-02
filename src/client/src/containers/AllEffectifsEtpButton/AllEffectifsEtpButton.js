import PropTypes from "prop-types";
import React from "react";

import AllEffectifsEtpButtonView from "../../components/DataSheets/Sections/SharedComponents/AllEffectifsButton";

const AllEffectifsEtpButton = ({ onClick, loading, text }) => {
  return (
    <AllEffectifsEtpButtonView
      getAllEffectifs={onClick}
      value={text}
      isLoading={loading}
    />
  );
};

AllEffectifsEtpButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default AllEffectifsEtpButton;
