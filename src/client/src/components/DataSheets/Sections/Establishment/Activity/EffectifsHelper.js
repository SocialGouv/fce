import { setYearMonthFormat } from "../../../../../helpers/Date";

export const getEffectifEtpDates = (data) =>
  data?.map((d) => setYearMonthFormat(d.periode_concerne));

export const getEffectifDsnDates = (data) => data?.map((d) => d.mois);

export const getCommunDates = (etpData, DsnData) => {
  // const etp = getEffectifEtpDates(etpData);
  // console.log(etp);
  // const dsn = getEffectifDsnDates(DsnData);
  // console.log("dsn", dsn);
  // return etp.filter((date) => dsn.includes(date));

  const commonDates = DsnData?.map((item) => item.mois).filter((date) =>
    etpData?.some((item) => item.periode_concerne.startsWith(date))
  );

  // Get values of effectif from data2 and eff from data1 corresponding to common dates
  return commonDates?.map((date) => {
    const data1Item = DsnData?.find((item) => item.mois === date);
    const data2Item = etpData?.find((item) =>
      item.periode_concerne.startsWith(date)
    );
    return {
      date,
      eff: data1Item.eff,
      effectif: data2Item.effectif,
    };
  });
};
