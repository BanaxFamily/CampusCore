import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

const data = [
  { year: "2015", activeUser: "203", courses: "23", files: "12" },
  { year: "2016", activeUser: "123", courses: "14", files: "123" },
  { year: "2017", activeUser: "150", courses: "56", files: "55" },
  { year: "2018", activeUser: "10", courses: "403", files: "294" },
  { year: "2019", activeUser: "13", courses: "18", files: "33" },
  { year: "2020", activeUser: "224", courses: "55", files: "450" },
];

const Chart = () => {
  return (
    <LineChart width={600} height={300} data={data}>
    <XAxis dataKey="year"/>
    <YAxis type="number" domain={[0, 500]}/>
    <Legend />
    <CartesianGrid stroke="#ccc" />
    <Line type="monotone" dataKey="activeUser" stroke="#8884d8" strokeWidth={2}/>
    <Line type="monotone" dataKey="courses" stroke="#82ca9d" strokeWidth={2}/>
    <Line type="monotone" dataKey="files" stroke="#FFCA29" strokeWidth={2}/>
  </LineChart>
  );
};
export default Chart;
