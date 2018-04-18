import React from "react";
import { Link } from "react-router-dom";
import Value from "../../../elements/Value";

const EstablishmentTransfert = ({ predecesseur, successeur, data }) => {
  return data
    ? [
        <dt className="dt col-md-4" key="transfert_label">
          SIRET {predecesseur ? "prédécesseur" : successeur ? "successeur" : ""}
        </dt>,
        <dd className="dd col-md-8" key="transfert_value">
          <Link to={`/establishment/${data.siret}`}>
            <Value value={data.siret} empty="-" />
          </Link>
        </dd>,
        <dt className="dt col-md-4" key="transfert_date_label">
          Date du transfert
        </dt>,
        <dd className="dd col-md-8" key="transfert_date_value">
          <Value value={data.date_transfert} empty="-" />
        </dd>
      ]
    : null;
};

export default EstablishmentTransfert;
