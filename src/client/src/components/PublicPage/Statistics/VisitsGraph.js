import Chartjs from "chart.js";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

const backgroundColors = [
  "rgba(41, 128, 185, 0.25)",
  "rgba(41, 128, 185, 0.30)",
  "rgba(41, 128, 185, 0.35)",
  "rgba(41, 128, 185, 0.40)",
  "rgba(41, 128, 185, 0.45)",
  "rgba(41, 128, 185, 0.50)",
  "rgba(41, 128, 185, 0.55)",
  "rgba(41, 128, 185, 0.60)",
  "rgba(41, 128, 185, 0.65)",
  "rgba(41, 128, 185, 0.70)",
  "rgba(41, 128, 185, 0.75)",
  "rgba(41, 128, 185, 0.80)",
  "rgba(41, 128, 185, 0.85)",
];

const VisitsGraph = ({ data }) => {
  const canvasRef = useRef(null);
  const [persistData, setPersistData] = useState(null);

  if (!persistData) {
    setPersistData(data);
  }

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      new Chartjs(canvasRef.current, {
        data: {
          datasets: [
            {
              backgroundColor: backgroundColors,
              borderColor: backgroundColors,
              borderWidth: 2,
              data: persistData.map((month) => month.value),
              label: "Nombres de visites par mois",
            },
          ],
          labels: persistData.map((month) => month.label),
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
        type: "bar",
      });
    }
  }, [persistData, canvasRef]);

  return <canvas ref={canvasRef} height="90" />;
};

VisitsGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VisitsGraph;
