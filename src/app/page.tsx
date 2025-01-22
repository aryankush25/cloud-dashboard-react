"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ResourcesProvider } from "@/context/ResourcesContext";

const Dashboard = dynamic(() => import("@/components/Dashboard"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function Home() {
  console.log("Hello Client");

  return (
    <ResourcesProvider>
      <Dashboard />
    </ResourcesProvider>
  );
}
