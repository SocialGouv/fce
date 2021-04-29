import React from "react";
import PropTypes from "prop-types";
import Subcategory from "../../SharedComponents/Subcategory";
import Value from "../../../../shared/Value";
import Config from "../../../../../services/Config";

export const CollectiveAgreements = ({ idccList = null }) => {
  return (
    <Subcategory
      subtitle="Convention(s) collective(s) appliquée(s)"
      sourceSi="DSN"
    >
      <div className="section-datas__list">
        <div className="section-datas__list-description">
          Cliquez sur la convention collective pour consulter son contenu sur
          Legifrance
        </div>
        <ul>
          {idccList
            ? idccList.map(({ code, libelle }) => (
                <li className="section-datas__list-item" key={code}>
                  <a
                    href={Config.get("legifranceSearchUrl.idcc") + code}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Value value={`${code} - ${libelle}`} />
                  </a>
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
