import PropTypes from "prop-types";
import React from "react";

import { useRenderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import Subcategory from "../../SharedComponents/Subcategory";
import { useUniteDeControle } from "./UniteDeControle.gql";

function UniteDeControle({ siret }) {
  const { loading, data, error } = useUniteDeControle(siret);
  const shouldNotRender = useRenderIfSiret({ siret });

  if (loading || error || shouldNotRender) {
    return "error";
  }
  return (
    <Subcategory
      subtitle="Unité de contrôle"
      sourceSi={"dgt_wikit_uc"}
      hasDateImport
    >
      <div className="section-datas__list">
        <div className="is-link-text ">
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

export default UniteDeControle;
