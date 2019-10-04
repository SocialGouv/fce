import { joinNoFalsy, capitalize } from "../utils";

export const buildAddress = address => {
  let finalAddress = "";
  let lineValue;

  if (typeof address !== "object") {
    return null;
  }

  for (let i = 1; i <= 7; i++) {
    lineValue = address[`l${i}`];

    if (!lineValue) {
      continue;
    }

    finalAddress += `${lineValue} `;
  }

  return finalAddress.trim();
};

export const formatAddress = ({
  numero_voie,
  indice_repetition,
  type_voie,
  nom_voie,
  complement_adresse,
  code_postal,
  localite
}) => {
  const streetNumber = joinNoFalsy([numero_voie, indice_repetition]);
  const streetType = type_voie && type_voie.toLowerCase();
  const formatedStreetName = nom_voie && capitalize(nom_voie);
  const street = joinNoFalsy([streetType, formatedStreetName], " ");
  const locality = joinNoFalsy([code_postal, localite], " ");
  const formatedStreet = joinNoFalsy([streetNumber, street], " ");
  const additionalAddress =
    nom_voie &&
    nom_voie.toLowerCase() === complement_adresse &&
    complement_adresse.toLowerCase()
      ? null
      : capitalize(complement_adresse);
  return joinNoFalsy([formatedStreet, additionalAddress, locality], " - ");
};
