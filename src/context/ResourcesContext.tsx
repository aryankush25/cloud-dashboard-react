import React, { createContext, useContext, ReactNode } from "react";
import { Resource, FilterOptions } from "../types";
import { useResources } from "../hooks/useResources";

interface ResourcesContextType {
  resources: Resource[];
  allResources: Resource[];
  filters: FilterOptions;
  updateFilters: (filters: Partial<FilterOptions>) => void;
  clearFilters: () => void;
  isLoading: boolean;
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(
  undefined
);

export const ResourcesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const resourcesData = useResources();

  return (
    <ResourcesContext.Provider value={resourcesData}>
      {children}
    </ResourcesContext.Provider>
  );
};

export const useResourcesContext = () => {
  const context = useContext(ResourcesContext);
  if (!context) {
    throw new Error(
      "useResourcesContext must be used within a ResourcesProvider"
    );
  }

  return context;
};
