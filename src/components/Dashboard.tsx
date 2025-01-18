"use client";

import React from "react";
import { Toaster, toast } from "react-hot-toast";
import { FilterBar } from "./FilterBar";
import { MetricChart } from "./MetricChart";
import { NotificationPanel } from "./NotificationPanel";
import { ResourceCard } from "./ResourceCard";
import { DashboardFooter } from "./DashboardFooter";
import { useResources } from "../hooks/useResources";
import { useNotifications } from "../hooks/useNotifications";
import { BellIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  console.log("Hello Dashboard");
  const {
    resources,
    allResources,
    filters,
    updateFilters,
    clearFilters,
    isLoading,
  } = useResources();
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);

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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              Cloud Resource Dashboard
            </h1>
            <button
              onClick={() => setIsNotificationOpen(true)}
              className="relative p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              aria-label="Open notifications"
            >
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Filters */}
          <FilterBar
            filters={filters}
            onUpdateFilters={updateFilters}
            onClearFilters={clearFilters}
            resources={allResources}
          />

          {/* Metrics Overview */}
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[280px] h-[240px]">
              <MetricChart type="cpu" title="CPU Usage" />
            </div>
            <div className="flex-1 min-w-[280px] h-[240px]">
              <MetricChart type="memory" title="Memory Usage" />
            </div>
            <div className="flex-1 min-w-[280px] h-[240px]">
              <MetricChart type="disk" title="Disk Usage" />
            </div>
            <div className="flex-1 min-w-[280px] h-[240px]">
              <MetricChart type="network" title="Network Usage" />
            </div>
          </div>

          {/* Resources Grid */}
          <div className="flex flex-wrap gap-6">
            {isLoading ? (
              // Show skeleton cards while loading
              [...Array(6)].map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="w-full sm:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
                >
                  <ResourceCard isLoading={true} />
                </div>
              ))
            ) : resources.length === 0 ? (
              <div className="w-full p-8 text-center text-gray-500 bg-white rounded-lg">
                No resources match the current filters
              </div>
            ) : (
              resources.map((resource) => (
                <div
                  key={resource.id}
                  className="w-full sm:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
                >
                  <ResourceCard resource={resource} isLoading={false} />
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="mt-12 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 to-white">
        <DashboardFooter resources={allResources} />
      </div>

      {/* Notification Drawer */}
      <NotificationPanel
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAsRead={markAsRead}
        onRemove={removeNotification}
        onClearAll={clearAll}
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
}
