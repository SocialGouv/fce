import _get from "lodash.get";

export const getEnterpriseName = (data) => {
  return (
    _get(data, "raison_sociale") ||
    _get(data, "sigle") ||
    _get(data, "nom_commercial") ||
    `${_get(data, "nom", "")} ${_get(data, "prenom", "")}`.trim()
  );
};

export const getEstablishment = (siret, establishments) =>
  establishments.find(
    (establishment) => establishment.siret.trim() === siret.trim()
  );
