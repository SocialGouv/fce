import PropTypes from "prop-types";
import React from "react";

import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import Config from "../../../../../services/Config";
import {
  getConventionCode,
  getConventionLibelle,
  getLastConventionCollectives,
  removeInvalidConventions,
} from "../../../../../utils/conventions-collectives/conventions-collectives";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import { useConventionsCollectives } from "./ConventionsCollectives.gql";

const ConventionsCollectives = ({ siret }) => {
  const { loading, data, error } = useConventionsCollectives(siret);

  if (loading || error) {
    return null;
  }

  const idcc = removeInvalidConventions(
    getLastConventionCollectives(data.etablissements_idcc)
  );

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
        <ul className="section-datas__list-items">
          {idcc
            ? idcc.map((convention) => (
                <li
                  className="section-datas__list-item"
                  key={getConventionCode(convention)}
                >
                  <a
                    href={
                      Config.get("legifranceSearchUrl.idcc") +
                      getConventionCode(convention)?.replace?.(/^0+/, "")
                    }
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Value
                      value={`${getConventionCode(
                        convention
                      )} - ${getConventionLibelle(convention)}`}
                    />
                  </a>
                </li>
              ))
            : "-"}
        </ul>
      </div>
    </Subcategory>
  );
};

ConventionsCollectives.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(ConventionsCollectives);
