import * as XLSX from "xlsx";

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

export const exportToXLSX = (items, filename = "marches.xlsx") => {
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

  // Créer les données pour l'export
  const data = [
    headers, // En-têtes
    ...items.map((marche) => {
      const adresse = joinNoFalsy(
        [getCodePostal(marche?.etablissement), getCity(marche?.etablissement)],
        " - "
      );

      const acheteurText = getAcheteur(marche);
      const acheteurLink = `https://fce.fabrique.social.gouv.fr/establishment/${marche?.acheteur_id}/`;

      // Cette formule sera reconnue dans un fichier .xlsx natif
      const clickableAcheteur = {
        f: `HYPERLINK("${acheteurLink}", "${acheteurText}")`,
      };

      return [
        clickableAcheteur,
        formatUpperCase(adresse),
        formatUpperCase(marche?.objet),
        formatUpperCase(marche?.cpv_libelle),
        formatUpperCase(marche?.procedure),
        formatChiffre(marche?.montant),
        marche?.dateNotification,
        convertirMoisEnAnnees(marche?.dureeMois),
      ];
    }),
  ];

  // Créer un nouveau classeur
  const wb = XLSX.utils.book_new();

  // Convertir les données en feuille de calcul
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Ajouter la feuille de calcul au classeur
  XLSX.utils.book_append_sheet(wb, ws, "Marchés");

  // Générer le fichier XLSX
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Créer un Blob et déclencher le téléchargement
  const blob = new Blob([wbout], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
