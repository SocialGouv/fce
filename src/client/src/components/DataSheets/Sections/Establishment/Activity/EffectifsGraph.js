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
          backgroundColor: "#000091",
          borderColor: "#000091",
          borderWidth: 2,
          data: chartData?.map((obj) =>
            isEtpData && !isDsnData ? obj?.effectif : obj?.eff
          ),

          label: isEtpData && !isDsnData ? "Effectif ETP" : "Effectif physique",

          pointBackgroundColor: "white",

          pointBorderWidth: 1,
          tension: 0.3,
        },
      ],
      labels: chartData?.map((obj) =>
        isEtpData && !isDsnData
          ? setYearMonthFormat(obj?.periode_concerne)
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
        color: "#0063CB",
        display: true,
        font: {
          family: "Marianne, sans-serif",
          size: 14,

          weight: 700,
        },
        padding: {
          bottom: 30,
          top: 5,
        },
        text: isEtpData && !isDsnData ? "Effectif ETP" : "Effectif physique",
      },
    },

    responsive: true,

    scales: {
      x: {
        border: { display: false },
        grid: {
          borderColor: "white",
          color: "white", // <-- this line is answer to initial question
        },
        ticks: { color: "#7C8DB5 " },
      },

      y: {
        border: { display: false },
        grid: {
          borderColor: "#E6EDFF",
          color: "#E6EDFF", // <-- this line is answer to initial question
        },
        ticks: { color: "#7C8DB5" },
      },
    },
  };
  const onSelectChange = (event) => {
    setRange(parseInt(event.target.value));
  };

  return (
    <div className="chart">
      <LoadableContent>
        {(dsn_data?.length > 0 || etp_data?.length > 0) && (
          <>
            {" "}
            <div className="select-periode">
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
    </div>
  );
};

EffectifGraph.propTypes = {
  date: PropTypes.string,
  isDsnData: PropTypes.bool,
  isEtpData: PropTypes.bool,
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(EffectifGraph);
