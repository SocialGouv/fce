import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VisitsGraph = ({ data }) => {
  const [persistData, setPersistData] = useState(null);
  useEffect(() => {
    setPersistData(data);
  }, [data]);
  if (!persistData) {
    setPersistData(data);
  }

  const dataGraph = {
    datasets: [
      {
        backgroundColor: "rgba(41, 128, 185, 0.25)",
        borderColor: "rgba(41, 128, 185, 0.65)",
        borderWidth: 2,
        data: persistData?.map((month) => month.value),
        label: "Nombres de visites par mois",
      },
    ],
    labels: persistData?.map((month) => month.label),
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Nombres de visites par mois",
      },
    },
    responsive: true,
  };

  return <Bar data={dataGraph} options={options} />;
};

VisitsGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default VisitsGraph;
