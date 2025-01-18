import { useState, useEffect } from "react";
import { Notification } from "../types";
import NotificationService from "../services/notificationService";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const service = NotificationService.getInstance();

    // Subscribe to notification updates
    const unsubscribe = service.subscribe((updatedNotifications) => {
      setNotifications(updatedNotifications);
      setUnreadCount(
        updatedNotifications.filter((notification) => !notification.read).length
      );
    });

    // Start generating notifications
    service.startNotifications();

    return () => {
      unsubscribe();
      service.stopNotifications();
    };
  }, []);

  const markAsRead = (notificationId: string) => {
    const service = NotificationService.getInstance();
    service.markAsRead(notificationId);
  };

  const removeNotification = (notificationId: string) => {
    const service = NotificationService.getInstance();
    service.removeNotification(notificationId);
  };

  const clearAll = () => {
    const service = NotificationService.getInstance();
    service.clearAll();
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    removeNotification,
    clearAll,
  };
}
