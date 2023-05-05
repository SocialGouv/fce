import PropTypes from "prop-types";
import React from "react";

import AllEffectifsDsnButtonView from "../../components/DataSheets/Sections/SharedComponents/AllEffectifsButton";

const AllEffectifsDsnButton = ({ text, onClick, loading }) => {
  return (
    <AllEffectifsDsnButtonView
      getAllEffectifs={onClick}
      value={text}
      isLoading={loading}
    />
  );
};

AllEffectifsDsnButton.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default AllEffectifsDsnButton;
