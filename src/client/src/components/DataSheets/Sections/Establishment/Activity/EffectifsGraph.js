import "./effectifEtp.scss";

import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";

import {
  getStartDate,
  getStartDateEtp,
  setYearMonthFormat,
} from "../../../../../helpers/Date";
import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import LineChart from "../../../../Charts/LineChart";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import { useDsnEffectif } from "./EffectifsDsn.gql";
import { useEffectifsEtablissementsEtpData } from "./EffectifsEtp.gql";

const RANGE = 12;
const EffectifGraph = ({
  siret,
  isEtpData = false,
  isDsnData = false,
  date,
}) => {
  const [range, setRange] = useState(RANGE);
  const [chartData, setChartData] = useState([]);
  const { data: etp_data } = useEffectifsEtablissementsEtpData(
    siret,

    {
      effectifsMaxCount: range,
    },
    { periode_concerne: "asc" },
    getStartDateEtp(date, range)
  );

  const { data: dsn_data } = useDsnEffectif(
    siret,
    {
      limit: range,
    },
    { mois: "asc" },
    getStartDate(date, range)
  );

  useEffect(() => {
    if (isEtpData) setChartData(etp_data);
    if (isDsnData) setChartData(dsn_data);
  }, [isDsnData, isEtpData, etp_data, dsn_data]);

  const dataChart = useMemo(() => {
    return {
      datasets: [
        {
          backgroundColor: "#2980b9",
          borderColor: "#2980b9",
          borderWidth: 3,
          data: chartData?.map((obj) =>
            isEtpData && !isDsnData
              ? obj?.effectif !== 0
                ? obj?.effectif
                : null
              : obj?.eff
          ),

          label: isEtpData && !isDsnData ? "Effectif ETP" : "Effectif physique",

          pointBackgroundColor: "white",

          pointBorderWidth: 1,
          tension: 0.3,
        },
      ],
      labels: chartData?.map((obj) =>
        isEtpData && !isDsnData
          ? obj?.effectif !== 0
            ? setYearMonthFormat(obj?.periode_concerne)
            : null
          : obj.mois
      ),
    };
  }, [chartData, isEtpData, isDsnData]);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: isEtpData && !isDsnData ? "Effectif ETP" : "Effectif physique",
      },
    },

    responsive: true,

    scales: {
      x: {
        border: { display: false },
      },
      y: {
        border: { display: false },
      },
    },
  };
  const onSelectChange = (event) => {
    setRange(parseInt(event.target.value));
  };

  return (
    <>
      <LoadableContent>
        {(dsn_data?.length > 0 || etp_data?.length > 0) && (
          <>
            {" "}
            <div>
              <select value={range} onChange={onSelectChange}>
                <option value={6}>{"6 mois"}</option>
                <option value={12}>{"1 an"}</option>
                <option value={24}>{"2 ans"}</option>
                <option value={36}>{"3 ans"}</option>
                <option value={48}>{"4 ans"}</option>
                <option value={60}>{"5 ans"}</option>
              </select>
            </div>
            {etp_data?.length > 0 || dsn_data?.length > 0 ? (
              <LoadableContent>
                <div className="chart-wrapper">
                  <LineChart options={options} data={dataChart} />
                </div>
              </LoadableContent>
            ) : (
              <div>Données non disponibles.</div>
            )}
          </>
        )}
      </LoadableContent>
    </>
  );
};

EffectifGraph.propTypes = {
  isDsnData: PropTypes.bool,
  isEtpData: PropTypes.bool,
  siret: PropTypes.string.isRequired,
  date: PropTypes.string,
};

export default renderIfSiret(EffectifGraph);
