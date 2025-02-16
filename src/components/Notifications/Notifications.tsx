import { useEffect, useState } from "react";
import { Icampaignplus } from "@icons";
import { ListItem } from "@/components/List";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Notification {
  id: number;
  message: string;
  timestamp: string;
}

export default function Notifications() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleNotificationsToggle = () => {
    setShowNotifications(!showNotifications);
  };

  // Función para obtener notificaciones desde Supabase
  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from('notifications') // Cambia 'notifications' por el nombre de tu tabla
      .select('*');

    if (error) {
      console.error("Error fetching notifications:", error);
    } else {
      setNotifications(data);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

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
                    {new Date(notification.timestamp).toLocaleString()}
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