import React from "react";
import PropTypes from "prop-types";
import Table from "../../../SharedComponents/Table";
import Value from "../../../../../shared/Value";

import "./finances.scss";

const Finances = ({ establishment }) => {
  let dates = [];
  let caList = [];
  let emptyList = [];

  if (establishment.donnees_ecofi) {
    dates = Object.keys(establishment.donnees_ecofi).map((date, index) => {
      return (
        <th className="has-text-right" key={index}>
          <Value value={date} empty="-" />
        </th>
      );
    });
    caList = Object.values(establishment.donnees_ecofi).map((ca, index) => {
      ca = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0
      }).format(ca);
      return (
        <td className="has-text-right" key={index}>
          <Value value={ca} empty="-" />
        </td>
      );
    });

    emptyList = Object.values(establishment.donnees_ecofi).map((ca, index) => {
      return (
        <td className="has-text-right" key={index}>
          Non disponible
        </td>
      );
    });
  }

  return establishment.donnees_ecofi ? (
    <Table className="enterprise-finances">
      <thead>
        <tr>
          <th>Date fin exercice</th>
          {dates}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Chiffre d{"'"}affaires</th>
          {caList}
        </tr>
        <tr>
          <th scope="row">Résultats</th>
          {emptyList}
        </tr>
        <tr>
          <th scope="row">Capitaux propres</th>
          {emptyList}
        </tr>
      </tbody>
    </Table>
  ) : (
    <p className="enterprise-finances__not-available has-text-centered">
      Non disponible
    </p>
  );
};

Finances.propTypes = {
  establishment: PropTypes.object.isRequired
};

export default Finances;
