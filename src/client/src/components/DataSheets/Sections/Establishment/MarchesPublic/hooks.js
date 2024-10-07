import {
  convertirMoisEnAnnees,
  joinNoFalsy,
} from "../../../../../helpers/utils";
import { formatChiffre } from "../../../../../utils/donnees-ecofi/donnees-ecofi";
import { formatUpperCase } from "../../../../../utils/entreprise/entreprise";
import { getCodePostal } from "../../../../../utils/establishment/establishment";
import {
  getAcheteur,
  getCity,
} from "../../SharedComponents/NonBorderedTable/hooks";

export const exportToCSV = (items, filename = "marches.csv") => {
  const headers = [
    "Acheteur",
    "Departement",
    "Objet",
    "CPV",
    "Procédure",
    "Montant",
    "Notifié le",
    "Durée",
  ];

  // Create CSV content
  const csvContent = [
    headers.join(","),
    ...items.map((marche) => {
      const adresse = joinNoFalsy(
        [getCodePostal(marche?.etablissement), getCity(marche?.etablissement)],
        " - "
      );

      const acheteurText = getAcheteur(marche);
      const acheteurLink = `https://fce.fabrique.social.gouv.fr/establishment/${marche?.acheteur_id}/`;

      // Format the link as a clickable hyperlink for French Excel (with semicolon)
      const clickableAcheteur = `=HYPERLINK("${acheteurLink}"; "${acheteurText}")`;

      return [
        `${clickableAcheteur}`,
        `"${formatUpperCase(adresse)}"`,
        `"${formatUpperCase(marche?.objet)}"`,
        `"${formatUpperCase(marche?.cpv_libelle)}"`,
        `"${formatUpperCase(marche?.procedure)}"`,
        `"${formatChiffre(marche?.montant)}"`,
        `"${marche?.dateNotification}"`,
        `"${convertirMoisEnAnnees(marche?.dureeMois)}"`,
      ].join(",");
    }),
  ].join("\n");

  // Create a Blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
