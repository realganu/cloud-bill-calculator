import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b"];

function CostCharts({ bill, formatCurrency }) {
  const chartData = bill
    ? [
        { name: "Data Transfer", cost: bill.dataTransferCost },
        { name: "Virtual Machines", cost: bill.vmCost },
        { name: "Storage", cost: bill.storageCost },
      ]
    : [];

  const formatChartCurrency = (value) =>
    `₹${Number(value).toFixed(2)}`;

  return (
    <section className="content-card">
      <h2>Cloud Cost Analysis</h2>
      <p className="section-description">
        Visual representation of your cloud resource expenses.
      </p>

      {!bill ? (
        <div className="chart-placeholder">
          Calculate your bill to view cost analysis charts.
        </div>
      ) : bill.subtotal === 0 ? (
        <div className="chart-placeholder">
          No resource costs to display. Enter resource usage
          and calculate your bill.
        </div>
      ) : (
        <div className="charts-grid">
          <div className="chart-box">
            <h3>Resource Cost Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="cost"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(1)}%`
                  }
                >
                  {chartData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatChartCurrency(value)}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3>Resource Cost Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 15, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(value) => `₹${value}`} />
                <Tooltip
                  formatter={(value) => formatChartCurrency(value)}
                />
                <Legend />
                <Bar
                  dataKey="cost"
                  name="Resource Cost"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {bill && bill.subtotal > 0 && (
        <div className="chart-total">
          <div>
            <span>Subtotal</span>
            <strong>{formatCurrency(bill.subtotal)}</strong>
          </div>
          <div>
            <span>Discount</span>
            <strong className="discount">
              -{formatCurrency(bill.discountAmount)}
            </strong>
          </div>
          <div className="chart-final-total">
            <span>Final Estimated Cost</span>
            <strong>{formatCurrency(bill.total)}</strong>
          </div>
        </div>
      )}
    </section>
  );
}

export default CostCharts;
