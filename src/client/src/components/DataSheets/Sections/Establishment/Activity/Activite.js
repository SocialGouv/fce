import "./establishmentActivity.scss";

import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Subcategory from "../../SharedComponents/Subcategory";
import { useSuccessionData } from "./Activite.gql";
import DeveloppementEconomique from "./DeveloppementEconomique";
import EffectifsDsn from "./EffectifsDsn";
import EffectifsEtp from "./EffectifsEtp";
import Seveso from "./Seveso";
import SuccessionData from "./SuccessionData";
import TrancheEffectifsInsee from "./TrancheEffectifsInsee";

const Activite = ({ siret }) => {
  const { loading, data, error } = useSuccessionData(siret);

  return (
    <section id="activity" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faHistory} />
        </span>
        <h2 className="title">Activité</h2>
      </div>
      <div className="section-datas">
        <Subcategory subtitle="Lien de succession" sourceSi="Sirène">
          <LoadableContent error={error} loading={loading}>
            {data?.predecesseurs?.length > 0 && (
              <SuccessionData
                values={data?.predecesseurs}
                name="SIRET prédecesseur"
              />
            )}
            {data?.successeurs?.length > 0 && (
              <SuccessionData
                values={data?.successeurs}
                name="SIRET successeur"
              />
            )}
          </LoadableContent>
        </Subcategory>
        <Subcategory className="effectifs-establishment" subtitle="Effectifs">
          <TrancheEffectifsInsee siret={siret} />
          <EffectifsDsn siret={siret} />
          <EffectifsEtp siret={siret} />
        </Subcategory>
        <Seveso siret={siret} />
        <DeveloppementEconomique siret={siret} />
      </div>
    </section>
  );
};

Activite.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(Activite);
