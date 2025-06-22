import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Paper, Typography } from "@mui/material";
import type { CategorySummary } from "../Types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryChartProps {
  data: CategorySummary[];
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  const total = data.reduce((accumulator, item) => accumulator + item.total, 0);

  if (data.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Spending by Category
        </Typography>
        <Typography variant="body1" color="text.secondary">
          No data available
        </Typography>
      </Paper>
    );
  }

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        data: data.map((item) => item.total),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8AC24A",
          "#FF6B6B",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8AC24A",
          "#FF6B6B",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Spending by Category
      </Typography>
      Total: {total}
      <Box sx={{ height: 300 }}>
        <Pie data={chartData} options={options} />
      </Box>
    </Paper>
  );
};

export default CategoryChart;
