"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/LoadingSpinner";

const Dashboard = dynamic(() => import("@/components/Dashboard"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function Home() {
  console.log("Hello Client");

  return <Dashboard />;
}
