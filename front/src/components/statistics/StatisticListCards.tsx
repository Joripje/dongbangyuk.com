// import { Grid } from '@mui/material';

// interface GameScore {
//   type: string;
//   gameId: number;
//   score: number;
//   endurance: number;
//   resilience: number;
// }

// interface CardDataProps {
//   gameScoreList: GameScore[];
// }

// const StatisticListCards = (props: CardDataProps) => {
//   // 데이터를 3열씩 자른 배열을 생성합니다.

//   return (
//     <Grid container spacing={2}>

//     </Grid>
//   );
// };

// export default StatisticListCards;

// import { Grid } from '@mui/material';
// import Card from './Card';

// interface GameScore {
//   type: string;
//   gameId: number;
//   score: number;
//   endurance: number;
//   resilience: number;
// }

// interface CardDataProps {
//   gameScoreList: GameScore[];
// }

// const StatisticListCards = (props: CardDataProps) => {
//   const { gameScoreList } = props;

//   // 데이터를 3열씩 자른 배열을 생성합니다.
//   const rows = gameScoreList.reduce((acc, item, index) => {
//     const rowIndex = Math.floor(index / 3);
//     acc[rowIndex] = [...(acc[rowIndex] || []), item];
//     return acc;
//   }, [] as GameScore[][]);

//   return (
//     <Grid container spacing={2}>
//       {rows.map((row, rowIndex) => (
//         <Grid key={rowIndex} container item xs={12} spacing={2}>
//           {row.map((data, dataIndex) => (
//             <Grid key={dataIndex} item xs={4}>
//               <Card data={data} />
//             </Grid>
//           ))}
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default StatisticListCards;
