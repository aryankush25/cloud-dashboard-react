import React from "react";
import { Resource } from "../types";
import {
  ServerIcon,
  CircleStackIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

interface DashboardFooterProps {
  resources: Resource[];
}

export function DashboardFooter({ resources }: DashboardFooterProps) {
  const analytics = React.useMemo(() => {
    const statusCount = {
      healthy: 0,
      warning: 0,
      critical: 0,
      offline: 0,
    };

    const typeCount = {
      server: 0,
      database: 0,
      storage: 0,
    };

    let totalCpu = 0;
    let totalMemory = 0;
    let totalDisk = 0;
    let totalNetwork = 0;

    resources.forEach((resource) => {
      // Count by status
      statusCount[resource.status]++;

      // Count by type
      typeCount[resource.type]++;

      // Sum metrics
      totalCpu += resource.metrics.cpu;
      totalMemory += resource.metrics.memory;
      totalDisk += resource.metrics.disk;
      totalNetwork += resource.metrics.network;
    });

    const count = resources.length;
    const avgCpu = count ? Math.round(totalCpu / count) : 0;
    const avgMemory = count ? Math.round(totalMemory / count) : 0;
    const avgDisk = count ? Math.round(totalDisk / count) : 0;
    const avgNetwork = count ? Math.round(totalNetwork / count) : 0;

    return {
      total: count,
      status: statusCount,
      type: typeCount,
      averages: {
        cpu: avgCpu,
        memory: avgMemory,
        disk: avgDisk,
        network: avgNetwork,
      },
    };
  }, [resources]);

  return (
    <footer className="mt-auto bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Total Resources */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-6">
              Resources Overview
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {analytics.total}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  Total Resources
                </p>
              </div>
              <div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-green-600 font-semibold">
                      Healthy
                    </span>
                    <span className="text-gray-900 font-bold">
                      {analytics.status.healthy}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-yellow-600 font-semibold">
                      Warning
                    </span>
                    <span className="text-gray-900 font-bold">
                      {analytics.status.warning}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-red-600 font-semibold">Critical</span>
                    <span className="text-gray-900 font-bold">
                      {analytics.status.critical}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-600 font-semibold">Offline</span>
                    <span className="text-gray-900 font-bold">
                      {analytics.status.offline}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resource Types */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-6">
              Resource Distribution
            </h3>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <ServerIcon className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      Servers
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {analytics.type.server}
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-in-out shadow-sm"
                    style={{
                      width: `${
                        analytics.total
                          ? (analytics.type.server / analytics.total) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <CircleStackIcon className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      Databases
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {analytics.type.database}
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500 ease-in-out shadow-sm"
                    style={{
                      width: `${
                        analytics.total
                          ? (analytics.type.database / analytics.total) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <ArchiveBoxIcon className="h-5 w-5 text-teal-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      Storage
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {analytics.type.storage}
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-500 ease-in-out shadow-sm"
                    style={{
                      width: `${
                        analytics.total
                          ? (analytics.type.storage / analytics.total) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Average Metrics */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-6">
              Performance Metrics
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.averages.cpu}%
                </p>
                <p className="text-sm font-semibold text-gray-700">CPU Usage</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.averages.memory}%
                </p>
                <p className="text-sm font-semibold text-gray-700">Memory</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.averages.disk}%
                </p>
                <p className="text-sm font-semibold text-gray-700">Disk</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.averages.network}%
                </p>
                <p className="text-sm font-semibold text-gray-700">Network</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-6">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      API Reference
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm font-medium text-gray-700 text-center">
            © {new Date().getFullYear()} Cloud Resource Dashboard. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
