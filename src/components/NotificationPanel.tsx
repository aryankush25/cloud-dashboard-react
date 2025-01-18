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
  isOpen: boolean;
  onClose: () => void;
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
  isOpen,
  onClose,
}: NotificationPanelProps) {
  return (
    <>
      {/* Backdrop */}
      <Transition
        show={isOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as={React.Fragment}
      >
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      </Transition>

      {/* Drawer */}
      <Transition
        show={isOpen}
        enter="transform transition-transform duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition-transform duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        as="div"
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BellIcon className="h-5 w-5 text-gray-500" />
              <h3 className="font-medium text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              {notifications.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close notifications"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
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
      </Transition>
    </>
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
      as="div"
    >
      <div
        className={`p-4 ${config.bgColor} ${
          !notification.read ? "border-l-4 " + config.borderColor : ""
        }`}
      >
        <div className="flex gap-3">
          <Icon className={`h-5 w-5 ${config.color} flex-shrink-0`} />
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0">
                <h4 className="font-medium text-sm text-gray-900 truncate">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1 break-words">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => onRemove(notification.id)}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0"
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
