import PropTypes from "prop-types";
import React from "react";

import AllEffectifsDsnButtonView from "../../components/DataSheets/Sections/SharedComponents/AllEffectifsButton";

const AllEffectifsDsnButton = ({ onClick, loading }) => {
  return (
    <AllEffectifsDsnButtonView
      getAllEffectifs={onClick}
      value="Afficher le détail et l'historique des effectifs"
      isLoading={loading}
    />
  );
};

AllEffectifsDsnButton.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default AllEffectifsDsnButton;
