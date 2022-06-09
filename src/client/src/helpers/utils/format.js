export const formatNumber = (number, options = {}, locale = "fr-FR") => {
  const defaultOptions = {
    currency: "EUR",
    minimumFractionDigits: 0,
    style: "decimal",
  };

  return new Intl.NumberFormat(locale, {
    ...defaultOptions,
    ...options,
  }).format(number);
};

export const formatTva = (tva = "") => `${tva.slice(0, 4)} ${tva.slice(4)}`;

export const formatSiren = (siren = "") =>
  `${siren.slice(0, 3)} ${siren.slice(3, 6)} ${siren.slice(6)}`;

export const formatSiret = (siret = "") =>
  `${formatSiren(siret.slice(0, 9))} ${siret.slice(9)}`;
