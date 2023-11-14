import PropTypes from "prop-types";
import React from "react";

import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import Subcategory from "../../SharedComponents/Subcategory";
import { useUniteDeControle } from "./UniteDeControle.gql";

function UniteDeControle({ siret }) {
  const { loading, data, error } = useUniteDeControle(siret);
  if (loading || error) {
    return "error";
  }
  return (
    <Subcategory
      subtitle="Unité de contrôle"
      sourceSi={"dgt_wikit_uc"}
      hasDateImport
    >
      <div className="section-datas__list">
        <div>
          {data?.CODE_UC}-{data?.LIB_UC}{" "}
          <a href={`mailto:${data?.Courrier_electronique}`}>
            {data?.Courrier_electronique}
          </a>
          {}
        </div>
      </div>
    </Subcategory>
  );
}

UniteDeControle.propTypes = { siret: PropTypes.string.isRequired };

export default renderIfSiret(UniteDeControle);
