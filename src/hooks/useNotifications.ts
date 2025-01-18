import { useState, useEffect, useCallback } from "react";
import { Notification } from "../types";
import NotificationService from "../services/notificationService";
import toast from "react-hot-toast";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleNewNotification = useCallback(
    (notification: (typeof notifications)[0]) => {
      if (!notification.read) {
        toast(notification.message, {
          icon:
            notification.type === "error"
              ? "🔴"
              : notification.type === "warning"
              ? "⚠️"
              : notification.type === "success"
              ? "✅"
              : "ℹ️",
          duration: 4000,
        });
      }
    },
    []
  );

  useEffect(() => {
    const service = NotificationService.getInstance();

    // Subscribe to notification updates
    const unsubscribe = service.subscribe(
      (updatedNotifications, { isAdded }) => {
        setNotifications(updatedNotifications);
        setUnreadCount(
          updatedNotifications.filter((notification) => !notification.read)
            .length
        );

        if (isAdded) {
          handleNewNotification(updatedNotifications[0]);
        }
      }
    );

    // Start generating notifications
    service.startNotifications();

    return () => {
      unsubscribe();
      service.stopNotifications();
    };
  }, [handleNewNotification]);

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
