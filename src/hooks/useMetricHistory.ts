import { useState, useEffect } from "react";
import { MetricHistory } from "../types";
import { getMetricHistory } from "../services/mockData";

export function useMetricHistory(
  metricType: "cpu" | "memory" | "disk" | "network"
) {
  const [history, setHistory] = useState<MetricHistory[]>([]);

  useEffect(() => {
    // Initialize with 24 hours of historical data
    setHistory(getMetricHistory(24));

    // Update history every minute with new data point
    const intervalId = setInterval(() => {
      setHistory((currentHistory) => {
        const newDataPoint = {
          timestamp: new Date().toISOString(),
          value: Math.floor(Math.random() * 100),
        };

        // Keep last 24 data points
        const updatedHistory = [...currentHistory.slice(1), newDataPoint];
        return updatedHistory;
      });
    }, 60000); // 1 minute

    return () => clearInterval(intervalId);
  }, [metricType]);

  const getFormattedData = () => {
    return {
      labels: history.map((point) => {
        const date = new Date(point.timestamp);
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }),
      datasets: [
        {
          label: `${metricType.toUpperCase()} Usage`,
          data: history.map((point) => point.value),
          fill: true,
          borderColor: getMetricColor(metricType),
          backgroundColor: `${getMetricColor(metricType)}33`, // 20% opacity
          tension: 0.4,
        },
      ],
    };
  };

  return {
    history,
    getFormattedData,
  };
}

function getMetricColor(metricType: string): string {
  const colors = {
    cpu: "#FF6384",
    memory: "#36A2EB",
    disk: "#FFCE56",
    network: "#4BC0C0",
  };
  return colors[metricType as keyof typeof colors] || "#FF6384";
}
