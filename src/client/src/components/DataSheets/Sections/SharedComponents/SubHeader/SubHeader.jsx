import "./SubHeader.scss";

import PropTypes from "prop-types";
import React from "react";

import {
  getNafLabel,
  getName,
} from "../../../../../utils/entreprise/entreprise";
import Value from "../../../../shared/Value";
import { useSidebarData } from "../../../Sidebar/Sidebar.gql";

const SubHeader = ({ siren }) => {
  const { loading, data: entrepriseData, error } = useSidebarData(siren);

  if (loading || error) {
    return null;
  }
  return (
    <div className="SubHeader">
      <div className="enterprise-name">
        {getName(entrepriseData).toLowerCase()}
      </div>
      <span>-</span>
      <p className="enterprise-naf">
        <Value value={getNafLabel(entrepriseData)} empty="-" />
      </p>
    </div>
  );
};
SubHeader.propTypes = {
  entreprise: PropTypes.object,
  siren: PropTypes.string.isRequired,
};

export default SubHeader;
