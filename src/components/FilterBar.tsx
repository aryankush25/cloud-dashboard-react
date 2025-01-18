import React from "react";
import { FilterOptions, Resource } from "../types";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface FilterBarProps {
  filters: FilterOptions;
  onUpdateFilters: (filters: Partial<FilterOptions>) => void;
  onClearFilters: () => void;
  resources: Resource[];
}

export function FilterBar({
  filters,
  onUpdateFilters,
  onClearFilters,
  resources,
}: FilterBarProps) {
  // Extract unique values from resources
  const uniqueRegions = [...new Set(resources.map((r) => r.region))];
  const uniqueAccounts = [...new Set(resources.map((r) => r.account))];

  const statusOptions = ["healthy", "warning", "critical", "offline"] as const;
  const typeOptions = ["server", "database", "storage"] as const;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex-grow min-w-[200px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              value={filters.search || ""}
              onChange={(e) => onUpdateFilters({ search: e.target.value })}
            />
            {filters.search && (
              <button
                onClick={() => onUpdateFilters({ search: "" })}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <FilterDropdown
          label="Status"
          value={filters.status}
          options={statusOptions}
          onChange={(value) => onUpdateFilters({ status: value })}
        />

        <FilterDropdown
          label="Type"
          value={filters.type}
          options={typeOptions}
          onChange={(value) => onUpdateFilters({ type: value })}
        />

        <FilterDropdown
          label="Region"
          value={filters.region}
          options={uniqueRegions}
          onChange={(value) => onUpdateFilters({ region: value })}
        />

        <FilterDropdown
          label="Account"
          value={filters.account}
          options={uniqueAccounts}
          onChange={(value) => onUpdateFilters({ account: value })}
        />

        {(filters.status ||
          filters.type ||
          filters.region ||
          filters.account ||
          filters.search) && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

interface FilterDropdownProps<T> {
  label: string;
  value?: T;
  options: readonly T[];
  onChange: (value: T | undefined) => void;
}

function FilterDropdown<T extends string>({
  label,
  value,
  options,
  onChange,
}: FilterDropdownProps<T>) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative min-w-[150px]">
        <Listbox.Button className="w-full flex items-center justify-between gap-2 px-4 py-2 text-left border rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
          <span className="block truncate text-sm">
            {value ? value : `Select ${label}`}
          </span>
          <ChevronDownIcon className="h-4 w-4 text-gray-400" />
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none">
          <Listbox.Option
            value={undefined}
            className={({ active }) =>
              `cursor-pointer select-none relative py-2 px-4 text-sm ${
                active ? "bg-blue-50 text-blue-900" : "text-gray-900"
              }`
            }
          >
            {`All ${label}s`}
          </Listbox.Option>
          {options.map((option) => (
            <Listbox.Option
              key={option}
              value={option}
              className={({ active }) =>
                `cursor-pointer select-none relative py-2 px-4 text-sm ${
                  active ? "bg-blue-50 text-blue-900" : "text-gray-900"
                }`
              }
            >
              {option}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
