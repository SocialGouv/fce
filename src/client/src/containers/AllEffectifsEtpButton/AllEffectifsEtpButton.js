import PropTypes from "prop-types";
import React from "react";

import AllEffectifsEtpButtonView from "../../components/DataSheets/Sections/SharedComponents/AllEffectifsButton";

const AllEffectifsEtpButton = ({ onClick, loading }) => {
  return (
    <AllEffectifsEtpButtonView
      getAllEffectifs={onClick}
      value="Afficher tous les effectifs ETP"
      isLoading={loading}
    />
  );
};

AllEffectifsEtpButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AllEffectifsEtpButton;
