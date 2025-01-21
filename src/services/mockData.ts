import { Resource, Notification } from "../types";

const regions = ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1"];
const accounts = ["Production", "Staging", "Development", "Testing"];
const resourceTypes = ["server", "database", "storage"] as const;
const statusTypes = ["healthy", "warning", "critical", "offline"] as const;

function generateRandomMetric(): number {
  return Math.floor(Math.random() * 100);
}

function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function generateMockResource(): Resource {
  const type = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
  const status = statusTypes[Math.floor(Math.random() * statusTypes.length)];
  const region = regions[Math.floor(Math.random() * regions.length)];
  const account = accounts[Math.floor(Math.random() * accounts.length)];

  return {
    id: generateRandomId(),
    name: `${type}-${generateRandomId().substring(0, 6)}`,
    type,
    status,
    region,
    account,
    metrics: {
      cpu: generateRandomMetric(),
      memory: generateRandomMetric(),
      disk: generateRandomMetric(),
      network: generateRandomMetric(),
      timestamp: new Date().toISOString(),
    },
  };
}

export function generateMockResources(count: number = 10): Resource[] {
  return Array.from({ length: count }, generateMockResource);
}

export function generateMockNotification(): Notification {
  const types = ["info", "warning", "error", "success"] as const;
  const type = types[Math.floor(Math.random() * types.length)];

  const messages = {
    info: "System update completed successfully",
    warning: "High resource usage detected",
    error: "Service is experiencing downtime",
    success: "Backup completed successfully",
  };

  return {
    id: generateRandomId(),
    title: `${type.toUpperCase()} Alert`,
    message: messages[type],
    type,
    timestamp: new Date().toISOString(),
    read: false,
  };
}

export function updateResourceMetrics(resources: Resource[]): Resource[] {
  return resources.map((resource) => ({
    ...resource,
    metrics: {
      cpu: generateRandomMetric(),
      memory: generateRandomMetric(),
      disk: generateRandomMetric(),
      network: generateRandomMetric(),
      timestamp: new Date().toISOString(),
    },
  }));
}

export function getMetricHistory(
  count: number = 24
): { timestamp: string; value: number }[] {
  return Array.from({ length: count }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    value: generateRandomMetric(),
  })).reverse();
}
