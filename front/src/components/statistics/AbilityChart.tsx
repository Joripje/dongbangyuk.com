// import { getAbilityData } from "api/statistics";
// import { useState, useEffect } from "react";
// import styled from "styled-components";
// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
// } from "chart.js";
// import { Radar } from "react-chartjs-2";

// const AbilityChart = () => {
//   ChartJS.register(
//     RadialLinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Filler
//   );

//   const [judgment, setJudgment] = useState<number>(0);
//   const [accuracy, setaccuracy] = useState<number>(0);
//   const [stability, setStability] = useState<number>(0);
//   const [endurance, setEndurance] = useState<number>(0);
//   const [resilience, setResilience] = useState<number>(0);
//   const [gameAbility, setGameAbility] = useState<number>(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getAbilityData({
//           gameid: 1,
//         });

//         setJudgment(response.judgment);
//         setaccuracy(response.accuracy);
//         setStability(response.stability);
//         setEndurance(response.endurance);
//         setResilience(response.resilience);
//         setGameAbility(response.gameAbility);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, []);

//   const data = {
//     labels: ["판단력", "정확도", "지구력", "회복탄력성"],
//     datasets: [
//       {
//         // label: "역량",
//         data: [judgment, accuracy, endurance, resilience],
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       r: {
//         suggestedMin: 0,
//         suggestedMax: 5,
//         ticks: {
//           stepSize: 1,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//   };

//   return (
//     <>
//       <div style={{ width: "400px", height: "400px" }}>
//         <Radar data={data} options={options} />
//       </div>
//     </>
//   );
// };
// export default AbilityChart;
