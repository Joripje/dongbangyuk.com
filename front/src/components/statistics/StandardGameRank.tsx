import { LineChart, Line, ReferenceLine, XAxis, ReferenceDot } from "recharts";
interface GameAbilityProps {
  GameAbility: number;
}

const StandardGameRank = (props: GameAbilityProps) => {
  const ReferenceLocation = {
    x: "",
    // "B", "D", "F", "H", "J"
    y: 4800,
    // 300, 1500, 5000, 1500, 300
  };

  // const ReferenceLocation = {
  //   x: "",
  //   y: 0,
  // };

  // GameAbility 값에 따라 ReferenceLocation 동적으로 설정
  switch (props.GameAbility) {
    case 1:
      ReferenceLocation.x = "B";
      ReferenceLocation.y = 300;
      break;
    case 2:
      ReferenceLocation.x = "D";
      ReferenceLocation.y = 1500;
      break;
    case 3:
      ReferenceLocation.x = "F";
      ReferenceLocation.y = 4800;
      break;
    case 4:
      ReferenceLocation.x = "H";
      ReferenceLocation.y = 1500;
      break;
    case 5:
      ReferenceLocation.x = "J";
      ReferenceLocation.y = 300;
      break;
    default:
      break;
  }
  const data = [
    {
      name: "A",
      pv: 100,
    },
    {
      name: "B",
      pv: 300,
    },
    {
      name: "C",
      pv: 800,
    },
    {
      name: "D",
      pv: 1500,
    },
    {
      name: "E",
      pv: 2900,
    },
    {
      name: "F",
      pv: 4800,
    },
    {
      name: "G",
      pv: 2900,
    },
    {
      name: "H",
      pv: 1500,
    },
    {
      name: "I",
      pv: 800,
    },
    {
      name: "J",
      pv: 300,
    },
    {
      name: "K",
      pv: 100,
    },
  ];

  return (
    <LineChart
      width={500}
      height={250}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        strokeWidth={3}
        dot={false}
      />
      <XAxis dataKey="name" hide={true} />
      <ReferenceLine x={ReferenceLocation.x} stroke="red" strokeWidth={3} />
      <ReferenceDot
        x={ReferenceLocation.x}
        y={ReferenceLocation.y}
        fill="green"
        stroke="none"
        r={8}
      />
    </LineChart>
  );
};

export default StandardGameRank;
