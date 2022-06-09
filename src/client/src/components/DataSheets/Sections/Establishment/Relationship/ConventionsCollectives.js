import PropTypes from "prop-types";
import React from "react";

import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import Config from "../../../../../services/Config";
import { getLastConventionCollectives } from "../../../../../utils/conventions-collectives/conventions-collectives";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import { useConventionsCollectives } from "./ConventionsCollectives.gql";

const ConventionsCollectives = ({ siret }) => {
  const { loading, data, error } = useConventionsCollectives(siret);

  if (loading || error) {
    return null;
  }

  const idcc = getLastConventionCollectives(data.etablissements_idcc);

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
          {idcc
            ? idcc.map(({ libelle: { code, libelle } }) => (
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
  );
};

ConventionsCollectives.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(ConventionsCollectives);
