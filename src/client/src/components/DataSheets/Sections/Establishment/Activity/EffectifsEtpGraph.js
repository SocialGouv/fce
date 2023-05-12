import "./effectifEtp.scss";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  getStartDate,
  getStartDateEtp,
  setYearMonthFormat,
} from "../../../../../helpers/Date";
import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import { useDsnEffectif } from "./EffectifsDsn.gql";
import { useEffectifsEtablissementsEtpData } from "./EffectifsEtp.gql";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const RANGE = 12;
const EffectifEtpGraph = ({ siret }) => {
  const [range, setRange] = useState(RANGE);
  const [chartData, setChartData] = useState([]);
  const [etpBtn, setEtpBtn] = useState(true);
  const [dsnBtn, setDsnBtn] = useState(false);
  const { data: etp_data } = useEffectifsEtablissementsEtpData(
    siret,

    {
      effectifsMaxCount: range,
    },
    { periode_concerne: "asc" },
    getStartDateEtp(range)
  );
  const { data: dsn_data } = useDsnEffectif(
    siret,
    {
      limit: range,
    },
    { mois: "asc" },
    getStartDate(range)
  );
  useEffect(() => {
    if (etpBtn) setChartData(etp_data);
    if (dsnBtn) setChartData(dsn_data);
  }, [dsnBtn, etpBtn, etp_data, dsn_data]);

  const dataChart = useMemo(() => {
    return {
      datasets: [
        {
          backgroundColor: "#2980b9",
          borderColor: "#2980b9",
          borderWidth: 3,

          data: chartData?.map((obj) =>
            etpBtn && !dsnBtn
              ? obj?.effectif !== 0
                ? obj?.effectif
                : null
              : obj?.eff
          ),

          label: etpBtn && !dsnBtn ? "Effectif ETP" : "Effectif DSN",

          pointBackgroundColor: "white",
          pointBorderWidth: 1,
        },
      ],
      labels: chartData?.map((obj) =>
        etpBtn && !dsnBtn
          ? obj?.effectif !== 0
            ? setYearMonthFormat(obj?.periode_concerne)
            : null
          : obj.mois
      ),
    };
  }, [chartData, etpBtn, dsnBtn]);

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
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

  const onSelectEtpData = () => {
    if (!etpBtn) {
      setEtpBtn(true);
      setDsnBtn(false);
      setChartData(etp_data);
    }
  };

  const onSelectDsnData = () => {
    if (!dsnBtn) {
      setDsnBtn(true);
      setEtpBtn(false);
      setChartData(dsn_data);
    }
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
              <Line options={options} data={dataChart} />
            ) : (
              <div>No data available.</div>
            )}
            <div className="chart-selec-data-source">
              <button disabled={etpBtn} onClick={onSelectEtpData}>
                {"Effectif ETP"}
              </button>
              <button disabled={dsnBtn} onClick={onSelectDsnData}>
                {"Effectif DSN"}
              </button>
            </div>
          </>
        )}
      </LoadableContent>
    </>
  );
};

EffectifEtpGraph.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(EffectifEtpGraph);
