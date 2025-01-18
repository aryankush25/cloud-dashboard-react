"use client";

import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/components/Dashboard"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  console.log("Hello Client");

  return <Dashboard />;
}
