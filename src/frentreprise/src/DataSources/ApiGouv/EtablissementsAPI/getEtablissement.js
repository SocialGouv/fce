import utils from "../utils";

const getEtablissement = async (SIRET, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `etablissements/${SIRET}`,
    params,
    (out, data) => {
      if (data && data.etablissement) {
        const et = data.etablissement;

        [].forEach(key => {
          out[key] = et[key];
        });

        out.date_creation = utils.convertDate(et.date_creation_etablissement);

        if (et.adresse && typeof et.adresse === "object") {
          out.adresse = utils.getCleanAddress(et.adresse);
          out.adresse_components = et.adresse;
          out.departement =
            typeof et.adresse.code_insee_localite === "string" &&
            et.adresse.code_insee_localite.length > 1 &&
            et.adresse.code_insee_localite.substr(0, 2);
        }

        out.code_region =
          (et.region_implantation && +et.region_implantation.code) || 0;

        out.region =
          (et.region_implantation && et.region_implantation.value) || undefined;

        out.activite =
          et.naf && et.libelle_naf ? `${et.naf} - ${et.libelle_naf}` : null;

        out.etablissement_employeur =
          +et.tranche_effectif_salarie_etablissement.a > 0;

        out.tranche_effectif_insee =
          et.tranche_effectif_salarie_etablissement.intitule;
        out.annee_tranche_effectif_insee =
          +et.tranche_effectif_salarie_etablissement.date_reference ||
          undefined;
      }
    }
  );
};

export default getEtablissement;
