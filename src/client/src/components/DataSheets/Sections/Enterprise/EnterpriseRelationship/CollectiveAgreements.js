import React from "react";
import PropTypes from "prop-types";
import Subcategory from "../../SharedComponents/Subcategory";
import Value from "../../../../shared/Value";

export const CollectiveAgreements = ({ idccList = null }) => {
  return (
    <Subcategory
      subtitle="Convention(s) collective(s) appliquée(s)"
      sourceSi="DSN"
    >
      <div className="single-value">
        <ul>
          {idccList
            ? idccList.map(({ code, libelle }) => (
                <li className="m-2" key={code}>
                  <Value value={`${code} - ${libelle}`} />
                </li>
              ))
            : "-"}
        </ul>
      </div>
    </Subcategory>
  );
};

CollectiveAgreements.propTypes = {
  idccList: PropTypes.array
};
