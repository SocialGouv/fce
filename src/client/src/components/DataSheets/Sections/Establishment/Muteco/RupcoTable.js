import React from "react";
import PropTypes from "prop-types";
import Value from "../../../../shared/Value";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import Table from "../../SharedComponents/Table";

import "./rupcoTable.scss";

const RupcoTable = ({ list, siren, rupcoFiles, hasTypeColumn = false }) => {
  return (
    <Table className="rupco-table-establishment">
      <thead>
        <tr>
          {hasTypeColumn && <th>Type</th>}
          <th>Date d{"'"}enregistrement</th>
          <th>Numéro de dossier</th>
          <th>État du dossier</th>
          <th>Nb maximum de ruptures de contrats envisagées</th>
          <th>Autres établissements</th>
        </tr>
      </thead>
      <tbody>
        {list.map(dossier => {
          const hasOtherEstablishments = !!(
            rupcoFiles &&
            rupcoFiles.find(file => file.numero === dossier.numero)
              .etablissements.length > 1
          );

          return (
            <tr key={dossier.numero}>
              {hasTypeColumn && (
                <td className="col-width-40">
                  <Value value={dossier.type} />
                </td>
              )}
              <td>
                <Value value={dossier.date_enregistrement} />
              </td>
              <td className="has-text-right">
                <Value value={dossier.numero} />
              </td>
              <td className="col-width-20">
                <Value value={dossier.etat} />
              </td>
              <td className="has-text-right col-width-20">
                <Value value={dossier.nombre_de_ruptures} hasNumberFormat />
              </td>
              <td>
                <Value
                  value={
                    hasOtherEstablishments ? (
                      <div>
                        <div className="rupco-table-establishment__other-establishments">
                          Oui
                        </div>
                        <SeeDetailsLink
                          link={`/enterprise/${siren}/#muteco`}
                          text="Voir la fiche entreprise"
                        />
                      </div>
                    ) : (
                      "Non"
                    )
                  }
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

RupcoTable.propTypes = {
  list: PropTypes.array.isRequired,
  siren: PropTypes.string.isRequired,
  rupcoFiles: PropTypes.arrayOf(PropTypes.object),
  hasTypeColumn: PropTypes.bool
};

export default RupcoTable;
