import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  Colors,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMetricHistory } from "../hooks/useMetricHistory";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  Colors
);

ChartJS.defaults.color = "#4B5563";
ChartJS.defaults.borderColor = "#E5E7EB";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index" as const,
      intersect: false,
      padding: 12,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      titleColor: "#111827",
      bodyColor: "#4B5563",
      borderColor: "#E5E7EB",
      borderWidth: 1,
      titleFont: {
        weight: "bold" as const,
      },
      callbacks: {
        title: (items: TooltipItem<"line">[]) => {
          if (items.length > 0) {
            const date = new Date(items[0].label);
            return date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          }
          return "";
        },
      },
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      beginAtZero: true,
      max: 100,
      grid: {
        color: "#F3F4F6",
      },
      border: {
        dash: [4, 4] as number[],
      },
      ticks: {
        padding: 8,
        callback: function (value: number | string) {
          return `${value}%`;
        },
      },
    },
    x: {
      type: "category" as const,
      grid: {
        display: false,
      },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 6,
      },
    },
  },
  interaction: {
    mode: "nearest" as const,
    axis: "x" as const,
    intersect: false,
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
} as const;

interface MetricChartProps {
  type: "cpu" | "memory" | "disk" | "network";
  title: string;
  className?: string;
}

export function MetricChart({ type, title, className = "" }: MetricChartProps) {
  const { getFormattedData } = useMetricHistory(type);

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 ${className}`}
    >
      <h3 className="text-lg font-medium mb-4 text-gray-900">{title}</h3>
      <div className="h-[200px]">
        <Line options={chartOptions} data={getFormattedData()} />
      </div>
    </div>
  );
}
