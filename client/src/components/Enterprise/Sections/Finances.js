import React from "react";
import Value from "../../../elements/Value";

class Finances extends React.Component {
  render() {
    const { establishment } = this.props;
    let dates = [];
    let caList = [];

    if (establishment.donnees_ecofi) {
      dates = Object.keys(establishment.donnees_ecofi).map((date, index) => {
        return (
          <th key={index}>
            <Value value={date} empty="-" />
          </th>
        );
      });
      caList = Object.values(establishment.donnees_ecofi).map((ca, index) => {
        return (
          <td key={index}>
            <Value value={ca} empty="-" />€
          </td>
        );
      });
    }

    return (
      <section id="finances" className="enterprise-section">
        <h1 className="title h4">Données économiques et financières</h1>

        {establishment.donnees_ecofi ? (
          <table className="table table-striped">
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
            </tbody>
          </table>
        ) : (
          <p className="text-center">Non disponible</p>
        )}
      </section>
    );
  }
}

export default Finances;
