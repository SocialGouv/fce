import React from "react";

class Item extends React.Component {
  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <li className="result-item">
        <dl className="description-list row bg-light">
          <dt className="col-md-3">Raison Sociale</dt>
          <dd className="definition col-md-9">
            {item.entreprise.raison_sociale}
          </dd>

          <dt className="col-md-3">SIREN</dt>
          <dd className="definition col-md-9">{item.entreprise.siren}</dd>

          <dt className="col-md-3">SIRET</dt>
          <dd className="definition col-md-9">
            {item.entreprise.siret_siege_social}
          </dd>
        </dl>
      </li>
    );
  }
}

export default Item;
