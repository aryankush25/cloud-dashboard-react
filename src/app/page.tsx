"use client";

import React from "react";
import { Toaster, toast } from "react-hot-toast";
import { FilterBar } from "../components/FilterBar";
import { MetricChart } from "../components/MetricChart";
import { NotificationPanel } from "../components/NotificationPanel";
import { ResourceCard } from "../components/ResourceCard";
import { useResources } from "../hooks/useResources";
import { useNotifications } from "../hooks/useNotifications";

export default function Dashboard() {
  const { resources, allResources, filters, updateFilters, clearFilters } =
    useResources();

  // Debug logging
  React.useEffect(() => {
    console.log("Page - All Resources:", JSON.stringify(allResources, null, 2));
    console.log(
      "Page - Filtered Resources:",
      JSON.stringify(resources, null, 2)
    );
    console.log("Page - Current Filters:", JSON.stringify(filters, null, 2));
  }, [allResources, resources, filters]);

  // Debug log resource count
  React.useEffect(() => {
    console.log(`Resource count in grid: ${resources.length}`);
  }, [resources]);

  const {
    notifications,
    unreadCount,
    markAsRead,
    removeNotification,
    clearAll,
  } = useNotifications();

  // Show toast for new notifications
  React.useEffect(() => {
    const handleNewNotification = (notification: (typeof notifications)[0]) => {
      if (!notification.read) {
        toast(notification.message, {
          icon:
            notification.type === "error"
              ? "🔴"
              : notification.type === "warning"
              ? "⚠️"
              : notification.type === "success"
              ? "✅"
              : "ℹ️",
          duration: 4000,
        });
      }
    };

    if (notifications.length > 0) {
      handleNewNotification(notifications[0]);
    }
  }, [notifications]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Cloud Resource Dashboard
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Filters */}
          <FilterBar
            filters={filters}
            onUpdateFilters={updateFilters}
            onClearFilters={clearFilters}
            resources={allResources}
          />

          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricChart type="cpu" title="CPU Usage" />
            <MetricChart type="memory" title="Memory Usage" />
            <MetricChart type="disk" title="Disk Usage" />
            <MetricChart type="network" title="Network Usage" />
          </div>

          {/* Resources and Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Resources Grid */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[calc(100vh-28rem)] overflow-y-auto p-1">
              {resources.length === 0 ? (
                <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-lg">
                  No resources match the current filters
                </div>
              ) : (
                resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))
              )}
            </div>

            {/* Notifications Panel */}
            <div className="lg:col-span-1 max-h-[calc(100vh-28rem)]">
              <NotificationPanel
                notifications={notifications}
                unreadCount={unreadCount}
                onMarkAsRead={markAsRead}
                onRemove={removeNotification}
                onClearAll={clearAll}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
