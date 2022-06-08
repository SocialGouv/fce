import "./psi.scss";

import PropTypes from "prop-types";
import React from "react";

import Value from "../../../../shared/Value";
import PgApiDataHandler from "../../SharedComponents/PgApiDataHandler";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table";

const Egapro = ({ egapro }) => (
  <div>
    <Subcategory
      subtitle="Index de l'égalité professionnelle"
      sourceSi="Egapro"
    >
      <div className="section-datas__list">
        <div className="section-datas__list-description">
          Toutes les entreprises d&apos;au moins 50 salariés doivent calculer et
          publier leur index de l&apos;égalité professionnelle entre les hommes
          et les femmes, chaque année au 1er mars
        </div>
        <div className="section-datas__list-item">
          <PgApiDataHandler isLoading={egapro.isLoading} error={egapro.error}>
            {egapro.index?.length > 0 ? (
              <Table className="enterprise-mandataires">
                <thead>
                  <tr>
                    <th className="th">Année</th>
                    <th className="th">Index</th>
                  </tr>
                </thead>
                <tbody>
                  {egapro.index?.map(({ annee, index }) => (
                    <tr key={annee}>
                      <td>
                        <Value value={annee} />
                      </td>
                      <td>
                        <Value
                          value={index ? `${index}/100` : ""}
                          empty="L'index n'a pas pu être calculé par l'entreprise  par manque de données"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="dt">
                Aucune déclaration pour cette entreprise.
              </div>
            )}
          </PgApiDataHandler>
        </div>
      </div>
    </Subcategory>
  </div>
);

Egapro.propTypes = {
  egapro: PropTypes.object.isRequired,
  sources: PropTypes.object.isRequired,
};

export default Egapro;
