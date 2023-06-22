import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Sample chart data
const pdata = [
  {
    name: "MongoDb",
    student: 11,
    fees: 120,
  },
  {
    name: "Javascript",
    student: 15,
    fees: 12,
  },
  {
    name: "PHP",
    student: 15,
    fees: 100,
  },
  {
    name: "Java",
    student: 10,
    fees: 5,
  },
  {
    name: "C#",
    student: 89,
    fees: 4,
  },
  {
    name: "C++",
    student: 10,
    fees: 108,
  },
];

function CustomerGraph() {
  const textHeading = "text-sm text-center";
  return (
    <>
      <h1 className={textHeading}>Cutomer Sales Purchases Graph</h1>
      <ResponsiveContainer className="mt-4" width="100%" aspect={4}>
        <LineChart data={pdata} margin={{ right: 30 }}>
          <CartesianGrid />
          <XAxis dataKey="name" interval={"preserveStartEnd"} />
          <YAxis></YAxis>
          <Legend />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="student"
            stroke="black"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="fees"
            stroke="red"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default CustomerGraph;
