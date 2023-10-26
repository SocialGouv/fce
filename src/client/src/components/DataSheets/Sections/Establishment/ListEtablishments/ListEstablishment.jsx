import React, { useState } from "react";

import { getEtablissements } from "../../../../../utils/entreprise/entreprise";
import { getEtablissementsCount } from "../../../Sidebar/Sidebar.gql";
import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import { useEstablishmentData } from "../../SharedComponents/EstablishmentContext.jsx";
import EstablishmentTable from "../../SharedComponents/EstablishmentTable/EstablishmentTable.jsx";

const ListEstablishment = () => {
  const { loading, data: entreprise, error } = useEstablishmentData();

  const [accordionOpen, setAccordionOpen] = useState(true);

  if (loading || error) {
    return null;
  }

  const etablissements = entreprise ? getEtablissements(entreprise) : [];

  const etablissementsCount = entreprise
    ? getEtablissementsCount(entreprise)
    : 0;

  return (
    <section id="autres-etablissements" className="data-sheet__bloc_section ">
      <BlocTitle
        isOpen={accordionOpen}
        toggleAccordion={() => setAccordionOpen(!accordionOpen)}
        text={`Autres Etablissements (
          ${etablissementsCount ? etablissementsCount : "0"})`}
      />

      {accordionOpen && (
        <div className="section-datas">
          {etablissementsCount > 0 && (
            <div className="data-sheet--table ">
              <EstablishmentTable
                entreprise={entreprise}
                etablissements={etablissements}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default React.memo(ListEstablishment);
