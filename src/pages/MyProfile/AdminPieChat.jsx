import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import PropTypes from "prop-types";

// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
// ];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AdminPieChart = ({siteData}) => {
  const data = [
    { name: "Users", value: siteData.userCount },
    { name: "Posts", value: siteData.postCount },
    { name: "Comments", value: siteData.commentCount },
  ]
  return (
    <ResponsiveContainer className={"overflow-auto"} width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) =>
            `${name}: ${value}`
          }
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

AdminPieChart.propTypes = {
  siteData: PropTypes.object,
}

export default AdminPieChart;
