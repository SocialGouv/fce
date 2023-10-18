import "./psi.scss";

import { faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table";

const Egapro = ({ enterprise }) => (
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
          {enterprise.egapro.length > 0 ? (
            <Table className="enterprise-mandataires">
              <thead>
                <tr>
                  <th className="th">Année</th>
                  <th className="th">Index</th>
                </tr>
              </thead>
              <tbody>
                {enterprise.egapro.map(({ annee, index }) => (
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
            <div className="dt">Aucune déclaration pour cette entreprise.</div>
          )}
        </div>
      </div>
      <div>
        <a
          href={`https://egapro.travail.gouv.fr/index-egapro/recherche?query=${enterprise.siren}`}
          rel="noreferrer noopener"
          target="_blank"
        >
          Consulter l&apos;index de l&apos;égalité professionnelle sur Egapro{" "}
          <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
        </a>
      </div>
    </Subcategory>
  </div>
);

Egapro.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default Egapro;
