import React from "react";

class Finances extends React.Component {
  render() {
    return (
      <section id="finances" className="enterprise-section">
        <h1 className="title h4">Données économiques et financières</h1>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date fin exercice</th>
              <th>31 dec 2011</th>
              <th>31 dec 2012</th>
              <th>31 dec 2013</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Chiffre d'affaires</th>
              <td>xxx.xxx.xxx €</td>
              <td>xxx.xxx.xxx €</td>
              <td>xxx.xxx.xxx €</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

export default Finances;
