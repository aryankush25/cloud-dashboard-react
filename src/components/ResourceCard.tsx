import React, { memo } from "react";
import { Resource } from "../types";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";

export function ResourceCardSkeleton() {
  return (
    <div className="h-full p-6 rounded-lg border shadow-sm border-gray-200 bg-white/50 backdrop-blur-sm animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex-1 min-w-[calc(50%-8px)]">
            <div className="w-full">
              <div className="flex justify-between text-sm mb-1">
                <div className="h-3 w-12 bg-gray-200 rounded" />
                <div className="h-3 w-8 bg-gray-200 rounded" />
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-200 rounded-full w-[60%]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

const ResourceCardSkeletonMemoized = memo(ResourceCardSkeleton);

interface ResourceCardProps {
  resource?: Resource;
  isLoading?: boolean;
}

const statusConfig = {
  healthy: {
    icon: CheckCircleIcon,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  warning: {
    icon: ExclamationCircleIcon,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  critical: {
    icon: XCircleIcon,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  offline: {
    icon: MinusCircleIcon,
    color: "text-gray-500",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
  },
};

export function ResourceCard({ resource, isLoading }: ResourceCardProps) {
  if (isLoading || !resource) {
    return <ResourceCardSkeletonMemoized />;
  }

  const status = statusConfig[resource.status];
  const StatusIcon = status.icon;

  return (
    <div
      className={`h-full p-6 rounded-lg border shadow-sm ${status.borderColor} ${status.bgColor} transition-all hover:bg-white hover:border-gray-300 hover:bg-white/50 backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <StatusIcon className={`h-5 w-5 ${status.color} flex-shrink-0`} />
          <h3 className="font-medium text-gray-900 truncate">
            {resource.name}
          </h3>
        </div>
        <span className="text-sm text-gray-500 flex-shrink-0">
          {resource.type.slice(0, 1).toUpperCase() + resource.type.slice(1)}
        </span>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex-1 min-w-[calc(50%-8px)]">
          <MetricItem
            label="CPU"
            value={resource.metrics.cpu}
            color={getMetricColor(resource.metrics.cpu)}
          />
        </div>
        <div className="flex-1 min-w-[calc(50%-8px)]">
          <MetricItem
            label="Memory"
            value={resource.metrics.memory}
            color={getMetricColor(resource.metrics.memory)}
          />
        </div>
        <div className="flex-1 min-w-[calc(50%-8px)]">
          <MetricItem
            label="Disk"
            value={resource.metrics.disk}
            color={getMetricColor(resource.metrics.disk)}
          />
        </div>
        <div className="flex-1 min-w-[calc(50%-8px)]">
          <MetricItem
            label="Network"
            value={resource.metrics.network}
            color={getMetricColor(resource.metrics.network)}
          />
        </div>
      </div>

      <div className="flex justify-between mt-4 text-sm text-gray-500">
        <span className="truncate">{resource.region}</span>
        <span className="truncate ml-2">{resource.account}</span>
      </div>
    </div>
  );
}

interface MetricItemProps {
  label: string;
  value: number;
  color: string;
}

function MetricItem({ label, value, color }: MetricItemProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className={color}>{value}%</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={clsx(
            "h-full transition-all duration-500 ease-in-out",
            getProgressBarColor(value)
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function getMetricColor(value: number): string {
  if (value >= 90) return "text-red-500";
  if (value >= 75) return "text-yellow-500";
  return "text-green-500";
}

function getProgressBarColor(value: number): string {
  if (value >= 90) return "bg-red-500";
  if (value >= 75) return "bg-yellow-500";
  return "bg-green-500";
}
