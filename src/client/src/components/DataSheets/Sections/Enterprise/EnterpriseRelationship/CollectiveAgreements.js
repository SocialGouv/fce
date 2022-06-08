import PropTypes from "prop-types";
import React from "react";

import Config from "../../../../../services/Config";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";

export const CollectiveAgreements = ({ idccList = null }) => (
  <div>
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
                    href={
                      Config.get("legifranceSearchUrl.idcc") +
                      code.replace(/^0+/, "")
                    }
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
  </div>
);

CollectiveAgreements.propTypes = {
  idccList: PropTypes.array,
};
