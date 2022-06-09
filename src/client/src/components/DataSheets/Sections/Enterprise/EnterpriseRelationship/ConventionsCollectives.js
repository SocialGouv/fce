import PropTypes from "prop-types";
import React from "react";

import Config from "../../../../../services/Config";
import { formatIdcc } from "../../../../../utils/idcc/idcc";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";

const ConventionsCollectives = ({ enterprise }) => {
  const formattedIdcc = formatIdcc(enterprise.idcc);

  return (
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
            {formattedIdcc
              ? formattedIdcc.map(({ idcc, libelle: { libelle } }) => (
                  <li className="section-datas__list-item" key={idcc}>
                    <a
                      href={
                        Config.get("legifranceSearchUrl.idcc") +
                        idcc.replace(/^0+/, "")
                      }
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Value value={`${idcc} - ${libelle}`} />
                    </a>
                  </li>
                ))
              : "-"}
          </ul>
        </div>
      </Subcategory>
    </div>
  );
};

ConventionsCollectives.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default ConventionsCollectives;
