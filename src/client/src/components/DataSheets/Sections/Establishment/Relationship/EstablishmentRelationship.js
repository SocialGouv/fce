import { get } from "lodash";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Config from "../../../../../services/Config";
import {
  getGroupedAccordsLastSigning,
  getGroupedAccordsSum,
  groupAccordsByType,
} from "../../../../../utils/accords/accords";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Value from "../../../../shared/Value";
import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import Data from "../../SharedComponents/Data";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable";
import Subcategory from "../../SharedComponents/Subcategory";
import ConventionsCollectives from "./ConventionsCollectives";
import { useAccordsEntreprise } from "./EstablishmentRelationship.gql";
import Psi from "./Psi";
import UniteDeControle from "./UniteDeControle.jsx";
import WorkAccident from "./WorkAccident";

const EstablishmentRelationship = ({ siret }) => {
  const { loading, data, error } = useAccordsEntreprise(siret);
  const [accordionOpen, setAccordionOpen] = useState(true);

  const accords = groupAccordsByType(data || []);
  const nbAccords = getGroupedAccordsSum(accords);
  const lastDate = getGroupedAccordsLastSigning(accords)
    ? getGroupedAccordsLastSigning(accords)
    : " ";

  return (
    <section id="relation" className="data-sheet__bloc_section ">
      <BlocTitle
        isOpen={accordionOpen}
        toggleAccordion={() => setAccordionOpen(!accordionOpen)}
        text={"Relation travail"}
      />

      {accordionOpen && (
        <div className="section-datas">
          <UniteDeControle siret={siret} />
          <ConventionsCollectives siret={siret} />
          <Subcategory subtitle="Accords d'entreprise" sourceSi="D@cccord">
            <LoadableContent loading={loading} error={error}>
              <Data
                name="Nombre total d'accords d'entreprise déposés depuis 1980"
                value={nbAccords}
                emptyValue="aucun accord connu"
                columnClasses={["is-7", "is-5"]}
                className="has-no-border"
                hasNumberFormat
              />
              {nbAccords > 0 && (
                <>
                  <Data
                    name="Date de signature du dernier accord d'entreprise déposé"
                    value={lastDate}
                    emptyValue="-"
                    columnClasses={["is-7", "is-5"]}
                    className="has-no-border"
                  />
                  {lastDate && (
                    <div className="data-sheet--table">
                      <NonBorderedTable>
                        <thead>
                          <tr>
                            <th>Thématique</th>
                            <th>Nombre d{"'"}accords</th>
                            <th>Date de signature du dernier accord</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Config.get("accords").map(({ key, value }) => (
                            <tr key={`accord-${key}`}>
                              <td>{value}</td>
                              <td>
                                <Value
                                  value={get(accords, `${key}.count`)}
                                  empty="-"
                                  nonEmptyValues={[0, "0"]}
                                  hasNumberFormat
                                />
                              </td>
                              <td>
                                <Value
                                  value={get(accords, `${key}.lastSignDate`)}
                                  empty="-"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </NonBorderedTable>
                    </div>
                  )}
                  <div className="is-link-text ">
                    <a
                      href={Config.get("legifranceSearchUrl.accords") + siret}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Rechercher ces accords sur Legifrance{" "}
                    </a>
                  </div>
                </>
              )}
            </LoadableContent>
          </Subcategory>

          <Psi siret={siret} />
          <WorkAccident siret={siret} />
        </div>
      )}
    </section>
  );
};

EstablishmentRelationship.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default EstablishmentRelationship;
