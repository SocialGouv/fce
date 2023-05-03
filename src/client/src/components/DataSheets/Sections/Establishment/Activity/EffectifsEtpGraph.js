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

const EffectifEtpGraph = ({ data }) => {
  const canvasRef = useRef(null);
  const [persistData, setPersistData] = useState(null);

  if (!persistData) {
    setPersistData(data);
  }

  useEffect(() => {
    if (canvasRef?.current) {
      new Chartjs(canvasRef.current, {
        data: {
          datasets: [
            {
              backgroundColor: backgroundColors,
              borderColor: backgroundColors,
              borderWidth: 2,
              data: persistData.map(({ periode_concerne, effectif }) => {
                return {
                  y: effectif,
                  x: periode_concerne,
                };
              }),
              label: "Effectif Etp par année",
            },
          ],
          labels: persistData.map(({ periode_concerne }) => periode_concerne),
        },
        options: {
          scales: {
            xAxes: [
              {
                stacked: true,
              },
            ],
          },
        },
        type: "line",
      });
    }
  }, [persistData, canvasRef]);

  return <canvas ref={canvasRef} height={"90"} />;
};

EffectifEtpGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EffectifEtpGraph;
