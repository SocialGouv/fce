import PropTypes from "prop-types";
import React from "react";

import { useRenderIfSiret } from "../../../../../../helpers/hoc/renderIfSiret";
import { formatChiffre } from "../../../../../../utils/donnees-ecofi/donnees-ecofi.js";
import LoadableContent from "../../../../../shared/LoadableContent/LoadableContent";
import Value from "../../../../../shared/Value";
import NonBorderedTable from "../../../SharedComponents/NonBorderedTable";
import { useSortableData } from "../../../SharedComponents/NonBorderedTable/hooks";
import SortableButton from "../../../SharedComponents/NonBorderedTable/SortableButton.jsx";
import SeeDetailsLink from "../../../SharedComponents/SeeDetailsLink";
import Subcategory from "../../../SharedComponents/Subcategory";
import { useAidesFinancieresData } from "./AidesFinancieres.gql";

const AidesFinancieres = ({ siret }) => {
  const { loading, data, error } = useAidesFinancieresData(siret);
  const { items, requestSort, sortConfig } = useSortableData(data, {
    direction: "descending",
    key: "dateConvention",
  });
  const shouldNotRender = useRenderIfSiret({ siret });

  if (error || loading || shouldNotRender) {
    return null;
  }

  return (
    <Subcategory subtitle="Aides financières" sourceSi="ADEME">
      <LoadableContent loading={loading} error={error}>
        {items?.length > 0 && (
          <div className="data-sheet--table">
            <NonBorderedTable>
              <thead>
                <tr>
                  <th>
                    <SortableButton
                      sortConfig={sortConfig}
                      columnKey="dateConvention"
                      requestSort={requestSort}
                      label="Date de convention"
                    />
                  </th>
                  <th className="th">Beneficiaire</th>
                  <th className="th">Objet</th>
                  <th>
                    <SortableButton
                      sortConfig={sortConfig}
                      columnKey="montant"
                      requestSort={requestSort}
                      label="Montant"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {items?.map((aide) => (
                  <tr key={aide?.nomBeneficiaire + aide?.dateConvention}>
                    <td>
                      <Value value={aide?.dateConvention} />
                    </td>
                    <td>
                      <SeeDetailsLink
                        text={aide?.nomBeneficiaire}
                        link={`/establishment/${aide?.siret?.siret}/`}
                        className={"list"}
                      />
                    </td>
                    <td>{aide?.objet}</td>
                    <td>{<Value value={formatChiffre(aide?.montant)} />}</td>
                  </tr>
                ))}
              </tbody>
            </NonBorderedTable>
          </div>
        )}
        {items?.length === 0 && (
          <div className="data-value is-centred">
            {"Aucune aide financières connue"}
          </div>
        )}
      </LoadableContent>
    </Subcategory>
  );
};

AidesFinancieres.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default AidesFinancieres;
