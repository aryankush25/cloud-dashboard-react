import React from "react";
import { Resource, FilterOptions } from "../types";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  CircleStackIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/solid";

interface FilterBarProps {
  filters: FilterOptions;
  onUpdateFilters: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  resources: Resource[];
}

export function FilterBar({
  filters,
  onUpdateFilters,
  onClearFilters,
  resources,
}: FilterBarProps) {
  // Get unique values for each filter
  const uniqueValues = React.useMemo(() => {
    const statuses = new Set<Resource["status"]>();
    const types = new Set<Resource["type"]>();
    const regions = new Set<string>();
    const accounts = new Set<string>();

    resources.forEach((resource) => {
      statuses.add(resource.status);
      types.add(resource.type);
      regions.add(resource.region);
      accounts.add(resource.account);
    });

    return {
      statuses: Array.from(statuses),
      types: Array.from(types),
      regions: Array.from(regions),
      accounts: Array.from(accounts),
    };
  }, [resources]);

  const hasActiveFilters =
    filters.search ||
    filters.status ||
    filters.type ||
    filters.region ||
    filters.account;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={filters.search || ""}
                onChange={(e) =>
                  onUpdateFilters({ ...filters, search: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                aria-label="Search resources"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Status */}
            <div className="min-w-[140px]">
              <div className="relative">
                <select
                  value={filters.status || ""}
                  onChange={(e) =>
                    onUpdateFilters({
                      ...filters,
                      status:
                        (e.target.value as Resource["status"]) || undefined,
                    })
                  }
                  className="w-full pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow appearance-none cursor-pointer"
                  aria-label="Filter by status"
                >
                  <option value="">All Status</option>
                  {uniqueValues.statuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                <SignalIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Type */}
            <div className="min-w-[140px]">
              <div className="relative">
                <select
                  value={filters.type || ""}
                  onChange={(e) =>
                    onUpdateFilters({
                      ...filters,
                      type: (e.target.value as Resource["type"]) || undefined,
                    })
                  }
                  className="w-full pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow appearance-none cursor-pointer"
                  aria-label="Filter by type"
                >
                  <option value="">All Types</option>
                  {uniqueValues.types.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
                <CircleStackIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Region */}
            <div className="min-w-[140px]">
              <div className="relative">
                <select
                  value={filters.region || ""}
                  onChange={(e) =>
                    onUpdateFilters({ ...filters, region: e.target.value })
                  }
                  className="w-full pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow appearance-none cursor-pointer"
                  aria-label="Filter by region"
                >
                  <option value="">All Regions</option>
                  {uniqueValues.regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                <GlobeAltIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Account */}
            <div className="min-w-[140px]">
              <div className="relative">
                <select
                  value={filters.account || ""}
                  onChange={(e) =>
                    onUpdateFilters({ ...filters, account: e.target.value })
                  }
                  className="w-full pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow appearance-none cursor-pointer"
                  aria-label="Filter by account"
                >
                  <option value="">All Accounts</option>
                  {uniqueValues.accounts.map((account) => (
                    <option key={account} value={account}>
                      {account}
                    </option>
                  ))}
                </select>
                <BuildingOfficeIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="flex items-center">
                <button
                  onClick={onClearFilters}
                  className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  aria-label="Clear all filters"
                >
                  <XMarkIcon className="h-4 w-4" />
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 rounded-b-xl">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FunnelIcon className="h-4 w-4" />
            <span className="font-medium">Active Filters:</span>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <span className="inline-flex items-center px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors shadow-sm">
                  Search: {filters.search}
                </span>
              )}
              {filters.status && (
                <span className="inline-flex items-center px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors shadow-sm">
                  Status: {filters.status}
                </span>
              )}
              {filters.type && (
                <span className="inline-flex items-center px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors shadow-sm">
                  Type: {filters.type}
                </span>
              )}
              {filters.region && (
                <span className="inline-flex items-center px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors shadow-sm">
                  Region: {filters.region}
                </span>
              )}
              {filters.account && (
                <span className="inline-flex items-center px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors shadow-sm">
                  Account: {filters.account}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
