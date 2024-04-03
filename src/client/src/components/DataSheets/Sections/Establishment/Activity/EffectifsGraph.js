import "./effectifEtp.scss";

import ChartDataLabels from "chartjs-plugin-datalabels";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  getStartDate,
  getStartDateEtp,
  setYearMonthFormat,
} from "../../../../../helpers/Date";
import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import EllipseIcon from "../../../../shared/Icons/EllipseIcon.jsx";
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
  const chartCanvasRef = useRef(null);

  const [range, setRange] = useState(RANGE);
  const [chartData, setChartData] = useState([]);

  const [datasetsToDisplay, setDatasetsToDisplay] = useState(["total"]);
  useEffect(() => {
    if (isDsnData && dsn_data?.length > 0) updateChart();
  }, [datasetsToDisplay, isDsnData, dsn_data]);

  const handleCheckboxChange = (event) => {
    const dataset = event.target.value;

    if (event.target.checked) {
      setDatasetsToDisplay((prevDatasets) => [...prevDatasets, dataset]);
    } else {
      setDatasetsToDisplay((prevDatasets) =>
        prevDatasets.filter((item) => item !== dataset)
      );
    }
  };

  const updateChart = () => {
    if (isDsnData) {
      const chart = chartCanvasRef?.current;
      chart?.data?.datasets.forEach((dataset) => {
        dataset.hidden = true;
      });

      datasetsToDisplay.forEach((datasetLabel) => {
        const datasetIndex = chart?.data?.datasets?.findIndex(
          (d) => d.label === datasetLabel
        );

        if (datasetIndex !== -1) {
          chart.data.datasets[datasetIndex].hidden = false;
        }
      });

      chart.update();
    }
  };

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
        isDsnData &&
          datasetsToDisplay.includes("hommes") && {
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "#85C1E9",
            borderWidth: 1,
            data: chartData?.map((obj) => obj?.hommes),
            label: "hommes",
            order: 2,
            stack: "0",
            type: "bar",
          },

        isDsnData &&
          datasetsToDisplay.includes("femmes") && {
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "#CC007A",
            borderWidth: 1,
            data: chartData?.map((obj) => obj?.femmes),
            label: "femmes",
            order: 2,
            stack: "0",
            type: "bar",
          },

        isDsnData &&
          datasetsToDisplay.includes("cdd") && {
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgb(255, 159, 64)",
            borderWidth: 1,
            data: chartData?.map((obj) => obj?.cdd),
            label: "cdd",
            order: 2,
            stack: "1",
            type: "bar",
          },

        isDsnData &&
          datasetsToDisplay.includes("cdi") && {
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 1,
            data: chartData?.map((obj) => obj?.cdi),

            label: "cdi",
            order: 2,
            stack: "1",
            type: "bar",
          },
        isDsnData &&
          datasetsToDisplay.includes("apprenti") && {
            backgroundColor: "rgba(201, 203, 207, 0.2)",
            borderColor: "rgb(201, 203, 207)",
            borderWidth: 1,
            data: chartData?.map((obj) => obj?.apprenti),
            label: "apprenti",
            stack: "2",
            type: "bar",
          },
        isDsnData &&
          datasetsToDisplay.includes("interim") && {
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgb(153, 102, 255)",
            borderWidth: 1,
            data: chartData?.map((obj) => obj?.interim),
            label: "interim",
            stack: "3",
            type: "bar",
          },

        (isEtpData || (isDsnData && datasetsToDisplay.includes("total"))) && {
          backgroundColor: "#000091",
          borderColor: "#000091",
          borderWidth: 2,
          data: chartData?.map((obj) =>
            isEtpData && !isDsnData ? obj?.effectif : obj?.eff
          ),
          datalabels: {
            align: "end",
            anchor: "end",
          },

          label: isEtpData ? "Effectif ETP" : "total",
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          tension: 0.3,
          type: "line",
        },
      ],
      labels: chartData?.map((obj) =>
        isEtpData && !isDsnData
          ? setYearMonthFormat(obj?.periode_concerne)
          : obj.mois
      ),
    };
  }, [chartData, isEtpData, isDsnData, datasetsToDisplay]);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: (context) => {
          return context.dataset.borderColor;
        },
        font: {
          weight: "bold",
        },
      },
      legend: {
        display: false,
        position: "bottom",
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
        text: isEtpData ? "Effectif ETP" : "Effectif physique",
      },
    },

    responsive: true,

    scales: {
      x: {
        border: { display: false },
        grid: {
          borderColor: "white",
          color: "white",
        },
        stacked: true,
        ticks: { color: "#7C8DB5 " },
      },

      y: {
        border: { display: false },
        grid: {
          borderColor: "#E6EDFF",
          color: "#E6EDFF",
        },
        stacked: true,
        ticks: { color: "#7C8DB5" },
      },
    },
  };

  const onSelectChange = (event) => {
    setRange(parseInt(event.target.value));
  };
  const datasets = [
    {
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "#85C1E9",
      label: "hommes",
    },
    {
      backgroundColor: "#CC007A",
      borderColor: "#CC007A",
      label: "femmes",
    },
    {
      backgroundColor: "rgb(75, 192, 192)",
      borderColor: "#2ECC71",
      borderWidth: 2.5,
      label: "cdi",
    },
    {
      backgroundColor: "#F1948A",
      borderColor: "rgb(255, 159, 64)",
      borderWidth: 2.5,
      label: "cdd",
    },
    {
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgb(153, 102, 255)",
      borderWidth: 2.5,
      label: "interim",
    },
    {
      backgroundColor: "#F1948A",
      borderColor: "rgb(201, 203, 207)",
      borderWidth: 2.5,
      label: "apprenti",
    },
    {
      backgroundColor: "#BB8FCE",
      borderColor: "#000091",
      borderWidth: 2.5,
      label: "total",
    },
  ];
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
            <>
              {isDsnData && (
                <>
                  {" "}
                  <div className="effectif-chart-legend">
                    <span className="text">Afficher la courbe :</span>
                    {datasets.map(({ label, borderColor }) => (
                      <div key={label}>
                        <input
                          type="checkbox"
                          value={label}
                          className="dataset-checkbox"
                          checked={datasetsToDisplay.includes(label)}
                          onChange={handleCheckboxChange}
                        />
                        <label>{label}</label>
                        <div key={label}>
                          <EllipseIcon color={borderColor} />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
            {etp_data?.length > 0 || dsn_data?.length > 0 ? (
              <LoadableContent>
                <div className="chart-wrapper">
                  <Line
                    ref={chartCanvasRef}
                    options={options}
                    data={dataChart}
                    plugins={[ChartDataLabels]}
                  />
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
