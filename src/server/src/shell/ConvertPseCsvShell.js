/**
 * Format PSE CSV to a well formed file before importing it into Postgres
 *
 * Fix wrong encoding : iconv -f windows-1252 -t UTF-8
 * Hide yarn output in stdout: --silent
 *
 * Commande:
 * cat .c42/tmp/input.csv | iconv -f windows-1252 -t UTF-8 | c42 server:yarn --silent shell ConvertPseCsv > .c42/tmp/output.csv
 *
 * Import dans postgres:
 * docker-compose exec db bash
 * psql -d fce -U postgres  -c "\copy etablissements_pse(numero_de_dossier,type_de_dossier,etat_du_dossier,accord_signe,date_de_jugement,date_d_enregistrement,situation_juridique,siret,nombre_de_ruptures_de_contrats_en_debut_de_procedure,nombre_de_ruptures_de_contrats_en_fin_de_procedure) FROM './tmp/output.csv' with (format csv, header true, delimiter ',');"
 *
 */

const Shell = require("./Shell");
const csv = require("fast-csv");

class ConvertPseCsvShell extends Shell {
  execute() {
    const stream = csv.format({ headers: true });
    stream.pipe(process.stdout);

    csv
      .parseStream(process.stdin, { headers: true, delimiter: "," })
      .transform(data => {
        Object.entries(data)
          .filter(([key, value]) => key.includes("SIRET_Etab") && value !== "")
          .map(establishments => establishments[0].slice(6))
          .forEach(establishment => {
            stream.write({
              numero_de_dossier: data.Numero_de_dossier,
              type_de_dossier: data.Type_de_dossier,
              etat_du_dossier: data.Etat_du_dossier,
              accord_signe: data.Accord_Signe,
              date_de_jugement: data.Date_de_jugement,
              date_d_enregistrement: data.date_enregistrement,
              situation_juridique: data.situation_juridique,
              siret: data[`SIRET_${establishment}`],
              nombre_de_ruptures_de_contrats_en_debut_de_procedure:
                data[`Nb_Rupture_debut_${establishment}`],
              nombre_de_ruptures_de_contrats_en_fin_de_procedure:
                data[`Nb_Rupture_fin__${establishment}`]
            });
          });
      });
  }
}

module.exports = ConvertPseCsvShell;
