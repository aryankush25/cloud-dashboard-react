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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Resources */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Resources
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {analytics.total}
                </p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
              <div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Healthy</span>
                    <span>{analytics.status.healthy}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-600">Warning</span>
                    <span>{analytics.status.warning}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Critical</span>
                    <span>{analytics.status.critical}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Offline</span>
                    <span>{analytics.status.offline}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resource Types */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Resource Types
            </h3>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <ServerIcon className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-900">
                      Servers
                    </span>
                  </div>
                  <span className="text-2xl font-semibold text-gray-900">
                    {analytics.type.server}
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500 ease-in-out"
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
                    <CircleStackIcon className="h-5 w-5 text-purple-500" />
                    <span className="text-sm font-medium text-gray-900">
                      Databases
                    </span>
                  </div>
                  <span className="text-2xl font-semibold text-gray-900">
                    {analytics.type.database}
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all duration-500 ease-in-out"
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
                    <ArchiveBoxIcon className="h-5 w-5 text-teal-500" />
                    <span className="text-sm font-medium text-gray-900">
                      Storage
                    </span>
                  </div>
                  <span className="text-2xl font-semibold text-gray-900">
                    {analytics.type.storage}
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-500 ease-in-out"
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
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Average Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {analytics.averages.cpu}%
                </p>
                <p className="text-sm text-gray-500">CPU Usage</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {analytics.averages.memory}%
                </p>
                <p className="text-sm text-gray-500">Memory</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {analytics.averages.disk}%
                </p>
                <p className="text-sm text-gray-500">Disk</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {analytics.averages.network}%
                </p>
                <p className="text-sm text-gray-500">Network</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      API Reference
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Support</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-900"
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
        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Cloud Resource Dashboard. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
