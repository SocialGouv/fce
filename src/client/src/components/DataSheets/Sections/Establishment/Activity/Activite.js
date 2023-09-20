import "./establishmentActivity.scss";

import PropTypes from "prop-types";
import React, { useState } from "react";

import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import Subcategory from "../../SharedComponents/Subcategory";
import { useSuccessionData } from "./Activite.gql";
import EffectifsDsn from "./EffectifsDsn";
import EffectifsEtp from "./EffectifsEtp";
import Finess from "./Finess";
import Seveso from "./Seveso";
import SuccessionData from "./SuccessionData";
import TrancheEffectifsInsee from "./TrancheEffectifsInsee";

const Activite = ({ siret }) => {
  const { loading, data, error } = useSuccessionData(siret);
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <section id="activity" className="data-sheet__bloc_section">
      <BlocTitle
        isOpen={accordionOpen}
        toggleAccordion={() => setAccordionOpen(!accordionOpen)}
        text={"Activité"}
      />

      {accordionOpen && (
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
          <Finess siret={siret} />
        </div>
      )}
    </section>
  );
};

Activite.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(Activite);
