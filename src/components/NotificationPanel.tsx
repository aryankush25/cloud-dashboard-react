import React from "react";
import { Notification } from "../types";
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Transition } from "@headlessui/react";

interface NotificationPanelProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

const notificationConfig = {
  info: {
    icon: InformationCircleIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  warning: {
    icon: ExclamationCircleIcon,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  error: {
    icon: XCircleIcon,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  success: {
    icon: CheckCircleIcon,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
};

export function NotificationPanel({
  notifications,
  unreadCount,
  onMarkAsRead,
  onRemove,
  onClearAll,
}: NotificationPanelProps) {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BellIcon className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {notifications.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No notifications to display
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onRemove,
}: NotificationItemProps) {
  const config = notificationConfig[notification.type];
  const Icon = config.icon;

  return (
    <Transition
      show={true}
      appear={true}
      enter="transition-all duration-300"
      enterFrom="opacity-0 -translate-x-4"
      enterTo="opacity-100 translate-x-0"
    >
      <div
        className={`p-4 ${config.bgColor} ${
          !notification.read ? "border-l-4 " + config.borderColor : ""
        }`}
      >
        <div className="flex gap-3">
          <Icon className={`h-5 w-5 ${config.color} flex-shrink-0`} />
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => onRemove(notification.id)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Remove notification"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </span>
              {!notification.read && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="text-xs text-blue-500 hover:text-blue-700"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
