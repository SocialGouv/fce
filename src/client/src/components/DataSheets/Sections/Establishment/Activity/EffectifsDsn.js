import PropTypes from "prop-types";
import React, { useState } from "react";

import AllEffectifsDsnButton from "../../../../../containers/AllEffectifsDsnButton/AllEffectifsDsnButton";
import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import Table from "../../SharedComponents/Table";
import { useDsnEffectif } from "./EffectifsDsn.gql";

const EXPANDED_MAX_EFFECTIFS = 12;
const COLLAPSED_MAX_EFFECTIFS = 1;

const EffectifsDsn = ({ siret }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    loading,
    error,
    data: effectifs,
  } = useDsnEffectif(siret, {
    limit: isExpanded ? EXPANDED_MAX_EFFECTIFS : COLLAPSED_MAX_EFFECTIFS,
  });

  return (
    <LoadableContent loading={loading} error={error}>
      {!isExpanded ? (
        <>
          <Data
            name="Effectif physique"
            value={effectifs?.[0]?.eff}
            nonEmptyValue=""
            sourceSi="DSN"
            hasNumberFormat={true}
          />
          <AllEffectifsDsnButton
            text="Afficher le détail et l'historique des effectifs"
            loading={loading}
            onClick={() => setIsExpanded(true)}
          />
        </>
      ) : (
        !loading && (
          <>
            <Table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Effectif Total</th>
                  <th>Homme</th>
                  <th>Femme</th>
                  <th>CDD</th>
                  <th>CDI</th>
                  <th>Total Interim</th>
                </tr>
              </thead>
              <tbody>
                {effectifs?.map?.((effectif) => (
                  <tr key={`effectif-${effectif?.id}`}>
                    <td>{effectif?.mois}</td>
                    <td>
                      <Value value={effectif?.eff} empty="-" />
                    </td>
                    <td>
                      <Value value={effectif?.hommes} empty="-" />
                    </td>
                    <td>
                      <Value value={effectif?.femmes} empty="-" />
                    </td>
                    <td>
                      <Value value={effectif?.cdd} empty="-" />
                    </td>
                    <td>
                      <Value value={effectif?.cdi} empty="-" />
                    </td>
                    <td>
                      <Value value={effectif?.interim} empty="-" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {isExpanded && (
              <AllEffectifsDsnButton
                text="Afficher uniquement l'effectif physique"
                loading={loading}
                onClick={() => setIsExpanded(false)}
              />
            )}
          </>
        )
      )}
    </LoadableContent>
  );
};

EffectifsDsn.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(EffectifsDsn);
