import React from "react";
import Value from "../Value";
export default ({
  address_components
}) => {
  if (address_components && typeof address_components != "object") {
    return "error";
  }

  const value = <p>
    <Value value={address_components.numero_voie}/>&nbsp;
    <Value value={address_components.type_voie}/>&nbsp;
    <Value value={address_components.nom_voie}/>&nbsp;
    <Value value={address_components.complement_adresse}/><br/>
    { address_components.cedex ?
      (<span><Value value={address_components.cedex}/><br/></span>)
      :null
    }
    <Value value={address_components.code_postal}/><br/>
    <Value value={address_components.localite}/>
  </p>;

  return value || null;
};
