import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  Legend,
} from "recharts";

interface EmotionChartProps {
  emotions: {
    [key: string]: number;
  };
}

const EmotionChart = (props: EmotionChartProps) => {
  const EmotionData = [
    {
      name: "분노",
      value: props.emotions.angry,
    },
    {
      name: "역겨움",
      value: props.emotions.disgust,
    },
    {
      name: "두려움",
      value: props.emotions.scared,
    },
    {
      name: "기쁨",
      value: props.emotions.happy,
    },
    {
      name: "슬픔",
      value: props.emotions.sad,
    },
    {
      name: "긴장감",
      value: props.emotions.surprised,
    },
    {
      name: "침착",
      value: props.emotions.neutral,
    },
  ];

  const position = (value: number) => {
    return value > 3.3 ? "insideTop" : "top";
  };
  return (
    <>
      <BarChart
        width={500}
        height={250}
        data={EmotionData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid vertical={false} /> */}
        <XAxis dataKey="name" />
        <YAxis tick={false} hide={true} padding={{ top: 10 }} />
        {/* <Tooltip /> */}
        {/* <Legend /> */}
        <Bar dataKey="value" fill="#8884d8">
          <LabelList
            dataKey="value"
            position="top"
            // style={{ fill: "white" }}
            formatter={(value: number) => `${value}%`}
          />
        </Bar>
      </BarChart>
    </>
  );
};

export default EmotionChart;
