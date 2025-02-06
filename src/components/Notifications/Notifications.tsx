import { useState } from "react";
import { Icampaignplus } from "@icons";
import { ListItem } from "@/components/List";

interface Notification {
  id: number;
  message: string;
  timestamp: string;
}

export default function Notifications() {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications: Notification[] = [
    {
      id: 1,
      message: "Nuevo mensaje de Taller Mecánico Express",
      timestamp: "Hace 5 minutos",
    },
    {
      id: 2,
      message: "Nuevo mensaje de Taller Mecánico Express",
      timestamp: "Hace 5 minutos",
    },
    {
      id: 3,
      message: "Nuevo mensaje de Taller Mecánico Express",
      timestamp: "Hace 5 minutos",
    },
  ];

  const handleNotificationsToggle = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <ListItem
      type="menu"
      className="relative"
      onClick={handleNotificationsToggle}
    >
      <div className="relative flex items-center">
        <Icampaignplus />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            {notifications.length}
          </span>
        )}
      </div>
      <span className="ml-2">Notificaciones</span>
      {showNotifications && (
        <div className="absolute overflow-auto top-full mt-2 right-0 w-56 bg-white border rounded-lg shadow-lg">
          <div className="p-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="mb-2 pb-2 border-b last:border-b-0"
                >
                  <p className="text-sm">{notification.message}</p>
                  <small className="text-gray-500">
                    {notification.timestamp}
                  </small>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                No tienes notificaciones
              </div>
            )}
          </div>
        </div>
      )}
    </ListItem>
  );
}
