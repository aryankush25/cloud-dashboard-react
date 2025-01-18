import { Notification } from "../types";
import { generateMockNotification } from "./mockData";

class NotificationService {
  private static instance: NotificationService;
  private listeners: ((
    notifications: Notification[],
    options: { isAdded?: boolean }
  ) => void)[] = [];
  private notifications: Notification[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private isAddedInitialNotifications = false;

  private constructor() {
    // Private constructor to enforce singleton
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public startNotifications() {
    if (this.intervalId) return;

    // Generate a new notification every 10-30 seconds
    this.intervalId = setInterval(() => {
      const notification = generateMockNotification();
      this.addNotification(notification);
    }, Math.random() * 20000 + 10000);

    // Add initial notifications
    if (this.isAddedInitialNotifications === false) {
      for (let i = 0; i < 3; i++) {
        this.addNotification(generateMockNotification(), false);
      }

      this.isAddedInitialNotifications = true;
    }
  }

  public stopNotifications() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public addNotification(notification: Notification, notify: boolean = true) {
    this.notifications = [notification, ...this.notifications];
    this.notifyListeners(notify);
  }

  public markAsRead(notificationId: string) {
    this.notifications = this.notifications.map((notification) =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    );
    this.notifyListeners();
  }

  public removeNotification(notificationId: string) {
    this.notifications = this.notifications.filter(
      (notification) => notification.id !== notificationId
    );
    this.notifyListeners();
  }

  public getNotifications(): Notification[] {
    return this.notifications;
  }

  public subscribe(
    listener: (
      notifications: Notification[],
      options: { isAdded?: boolean }
    ) => void
  ) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(isAdded: boolean = false) {
    this.listeners.forEach((listener) =>
      listener(this.notifications, { isAdded })
    );
  }

  public clearAll() {
    this.notifications = [];
    this.notifyListeners();
  }
}

export default NotificationService;
