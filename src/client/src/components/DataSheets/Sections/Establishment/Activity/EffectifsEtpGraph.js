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

import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import { useDsnEffectif } from "./EffectifsDsn.gql";
import { useEffectifsEtablissementsEtpData } from "./EffectifsEtp.gql";
import { getCommunDates } from "./EffectifsHelper";

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
  const { data: etp_data } = useEffectifsEtablissementsEtpData(
    siret,
    {
      effectifsMaxCount: range,
    },
    { periode_concerne: "asc" },
    [range]
  );
  const { data: dsn_data } = useDsnEffectif(
    siret,
    {
      limit: range,
    },
    { mois: "asc" }
  );
  useEffect(() => {
    const data = getCommunDates(etp_data, dsn_data);
    setChartData(data);
  }, [etp_data, dsn_data]);

  const dataChart = useMemo(() => {
    return {
      datasets: [
        {
          backgroundColor: "#2980b9",
          borderColor: "#2980b9",
          borderWidth: 3,
          data: chartData?.map((obj) => obj?.effectif),
          label: "Effectif ETP",
        },
        {
          backgroundColor: "#e74c3c",
          borderColor: "#e74c3c",
          borderWidth: 3,
          data: chartData?.map((obj) => obj?.eff),
          label: "Effectif DSN",
        },
      ],
      // labels: etp_data?.map((obj) => setYearMonthFormat(obj?.periode_concerne)),
      labels: chartData?.map((obj) => obj?.date),
    };
  }, [chartData]);
  console.log(chartData);
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
  };
  const onSelectChange = (event) => {
    setRange(parseInt(event.target.value));
  };
  return (
    <>
      <LoadableContent>
        <div>
          <select value={range} onChange={onSelectChange}>
            <option value={100}>{"6 mois"}</option>
            <option value={12}>{"1 an"}</option>
            <option value={24}>{"2 ans"}</option>
            <option value={48}>{"3 ans"}</option>
          </select>
        </div>
        {chartData?.length > 0 ? (
          <Line options={options} data={dataChart} />
        ) : (
          <div>No data available.</div>
        )}
      </LoadableContent>
    </>
  );
};

EffectifEtpGraph.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(EffectifEtpGraph);
