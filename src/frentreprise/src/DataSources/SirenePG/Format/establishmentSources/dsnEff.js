import { getFormatedDate } from "../../Helpers";

export default ({ dsnEff }) => {
  return {
    dernier_effectif_physique: dsnEff.eff,
    date_dernier_effectif_physique: getFormatedDate(dsnEff.date_maj),
    dsnEffectif: {
      total: dsnEff.eff,
      hommes: dsnEff.hommes,
      femmes: dsnEff.femmes,
      cdd: dsnEff.cdd,
      cdi: dsnEff.cdi,
      cdi_inter: dsnEff.cdi_inter,
      inter_mission: dsnEff.inter_mission,
      interim: dsnEff.interim,
      date: getFormatedDate(dsnEff.date_maj),
    },
  };
};
