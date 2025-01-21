export interface Resource {
  id: string;
  name: string;
  type: "server" | "database" | "storage";
  status: "healthy" | "warning" | "critical" | "offline";
  region: string;
  account: string;
  metrics: ResourceMetrics;
}

export interface ResourceMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  timestamp: string;
}

export interface MetricHistory {
  timestamp: string;
  value: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  timestamp: string;
  read: boolean;
}

export interface FilterOptions {
  status?: Resource["status"];
  type?: Resource["type"];
  region?: string;
  account?: string;
  search?: string;
}
