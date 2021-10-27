import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Subcategory from "../../SharedComponents/Subcategory";
import PgApiDataHandler from "../../SharedComponents/PgApiDataHandler";
import "./psi.scss";
import Value from "../../../../shared/Value";
import Table from "../../SharedComponents/Table";

const Egapro = ({ egapro, sources }) => (
  <div>
    <Subcategory
      subtitle="Index de l'égalité professionnelle"
      sourceSi="Egapro"
    >
      <PgApiDataHandler isLoading={egapro.isLoading} error={egapro.error}>
        {egapro.index?.length > 0 ?
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
                    <Value value={index ? `${index}/100` : ""} empty="L'index n'a pas pu être calculé par l'entreprise  par manque de données" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> :
          <div className="section-datas__list-description">Aucune déclaration pour cette entreprise.</div>}
      </PgApiDataHandler>
    </Subcategory>
  </div>
);

Egapro.propTypes = {
  egapro: PropTypes.object.isRequired,
  sources: PropTypes.object.isRequired,
};

export default Egapro;
