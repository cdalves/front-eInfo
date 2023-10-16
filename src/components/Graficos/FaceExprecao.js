import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export const Exprecao = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      const storedData = localStorage.getItem("data");
      const dataStorage = storedData ? JSON.parse(storedData) : [];
      return dataStorage;
    };

    const updateChartData = () => {
      const newdata = fetchDataFromLocalStorage();

      const chartData = [
        [
          "tempo",
          "neutro",
          "Feliz",
          "triste",
          "medo",
          "nervoso",
          "nojo",
          "surpreso"
        ],
        ...newdata
      ];

      setData(chartData);
    };

    updateChartData();

    // Atualize os dados do gráfico a cada 5 segundos
    const interval = setInterval(() => {
      updateChartData();
    }, 5000);

    // Certifique-se de limpar o intervalo ao desmontar o componente
    return () => clearInterval(interval);
  }, []);

  const options = {
    chart: {
      title: "Expreções do público",
      subtitle: "Porcentagem(%)",
    },
  };

  return (
    <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default Exprecao;
