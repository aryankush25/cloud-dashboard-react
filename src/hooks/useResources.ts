import { useState, useEffect } from "react";
import { Resource, FilterOptions } from "../types";
import {
  generateMockResources,
  updateResourceMetrics,
} from "../services/mockData";

export function useResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading delay
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const initialResources = generateMockResources(15);

        setResources(initialResources);
        setFilteredResources(initialResources);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Update metrics every 5 seconds
    const intervalId = setInterval(() => {
      setResources((currentResources) => {
        const updatedResources = updateResourceMetrics(currentResources);

        return updatedResources;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let result = [...resources];

    if (filters.status) {
      result = result.filter((resource) => resource.status === filters.status);
    }

    if (filters.type) {
      result = result.filter((resource) => resource.type === filters.type);
    }

    if (filters.region) {
      result = result.filter((resource) => resource.region === filters.region);
    }

    if (filters.account) {
      result = result.filter(
        (resource) => resource.account === filters.account
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (resource) =>
          resource.name.toLowerCase().includes(searchLower) ||
          resource.id.toLowerCase().includes(searchLower)
      );
    }

    setFilteredResources(result);
  }, [resources, filters]);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return {
    resources: filteredResources,
    allResources: resources,
    filters,
    updateFilters,
    clearFilters,
    isLoading,
  };
}
