import React from "react";
import Value from "../../../elements/Value";

class Finances extends React.Component {
  render() {
    const { establishment } = this.props;
    let dates = [];
    let caList = [];
    let emptyList = [];

    if (establishment.donnees_ecofi) {
      dates = Object.keys(establishment.donnees_ecofi).map((date, index) => {
        return (
          <th key={index}>
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
          <td key={index}>
            <Value value={ca} empty="-" />
          </td>
        );
      });

      emptyList = Object.values(establishment.donnees_ecofi).map(
        (ca, index) => {
          return <td key={index}>Non disponible</td>;
        }
      );
    }

    return (
      <>
        {establishment.donnees_ecofi ? (
          <table className="table is-striped">
            <thead>
              <tr>
                <th>Date fin exercice</th>
                {dates}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Chiffre d'affaires</th>
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
          </table>
        ) : (
          <p className="text-center">Non disponible</p>
        )}
      </>
    );
  }
}

export default Finances;
