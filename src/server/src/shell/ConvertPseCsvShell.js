const Shell = require("./Shell");
const readline = require("readline");
const csv = require("fast-csv");

const finalCols = [
  "numero_de_dossier",
  "type_de_dossier",
  "date_d_enregistrement",
  "etat_du_dossier",
  "accord_signe",
  "date_de_jugement",
  "situation_juridique",
  "siret",
  "nombre_de_ruptures_de_contrats_en_debut_de_procedure",
  "nombre_de_ruptures_de_contrats_en_fin_de_procedure"
];

class ConvertPseCsvShell extends Shell {
  execute() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
    const stream = csv.format();
    stream.pipe(process.stdout);

    stream.write(finalCols);

    let isHeader = true;

    rl.on("line", function(line) {
      if (isHeader) {
        isHeader = false;
        return;
      }

      // ici on récupère les lignes en entrée (donc plus de 1000 colonnes lol)
      // globalement pour une ligne en entrée on va avoir plusieurs lignes en sortie car il ont bien géré la chose (lol) tous les siret d'une entreprise sont sur la même ligne.
      // donc certaines colonnes sont communes ("numero_de_dossier","type_de_dossier","date_d_enregistrement","etat_du_dossier","accord_signe","date_de_jugement","situation_juridique",)
      // Là ou ça se corce c'est que le 1er etab commence à la colonne 13, le second colonne 19 le 3eme colonne 25
      // et bien sûr quand c'est pas renseigné c'est qu'il n'y a plus d'étab

      // le but et donc de push dans stdout un csv que pgadmin puisse importer facilement

      // pour lancer le script : cat .c42/tmp/test.csv | c42 server:yarn shell ConvertPseCsv
    });
  }
}

module.exports = ConvertPseCsvShell;
