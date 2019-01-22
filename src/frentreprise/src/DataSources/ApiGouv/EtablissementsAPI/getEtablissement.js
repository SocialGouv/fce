import utils from "../../../Utils/utils";

const getEtablissement = async (SIRET, Axios, params) => {
  return await utils
    .requestAPI(Axios, `etablissements/${SIRET}`, params)
    .then(data => {
      const out = {};
      if (data && data.etablissement) {
        const et = data.etablissement;

        ["siret", "siege_social", "enseigne", "naf", "libelle_naf"].forEach(
          key => {
            if (typeof et[key] === "boolean") out[key] = et[key];
            else out[key] = et[key] || undefined;
          }
        );

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
          (et.region_implantation && +et.region_implantation.code) || undefined;

        out.region =
          (et.region_implantation && et.region_implantation.value) || undefined;

        out.activite =
          et.naf && et.libelle_naf
            ? `${et.naf} - ${et.libelle_naf}`
            : undefined;

        out.etablissement_employeur = et.tranche_effectif_salarie_etablissement
          ? +et.tranche_effectif_salarie_etablissement.a > 0
          : undefined;

        out.tranche_effectif_insee =
          et.tranche_effectif_salarie_etablissement &&
          et.tranche_effectif_salarie_etablissement.intitule;

        out.annee_tranche_effectif_insee = et.tranche_effectif_salarie_etablissement
          ? +et.tranche_effectif_salarie_etablissement.date_reference ||
            undefined
          : undefined;
      }
      return out;
    });
};

export default getEtablissement;
