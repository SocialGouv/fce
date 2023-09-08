import "./SubHeader.scss";

import React from "react";

import {
  getNafLabel,
  getName,
} from "../../../../../utils/entreprise/entreprise";
import Value from "../../../../shared/Value";
import { useEstablishmentData } from "../EstablishmentContext.jsx";

const SubHeader = () => {
  const { loading, data, error } = useEstablishmentData();
  if (loading || error || !data) {
    return null;
  }
  return (
    <div className="SubHeader">
      <div className="SubHeader-name">{getName(data).toLowerCase()}</div>
      <span>-</span>
      <p className="SubHeader-naf">
        <Value value={getNafLabel(data)} empty="-" />
      </p>
    </div>
  );
};

export default SubHeader;
