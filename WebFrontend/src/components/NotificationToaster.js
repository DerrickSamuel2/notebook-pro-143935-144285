import React, { useState, useEffect } from "react";
import * as api from "../api/endpoints";

export default function NotificationToaster() {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    api.getNotifications().then(setNotifications).catch(() => setNotifications([]));
  }, []);
  return (
    <div className="notification-toaster" aria-live="polite">
      {notifications.map(n => (
        <div key={n.id} className="notification" tabIndex={0}>
          <span>{n.message}</span>
        </div>
      ))}
    </div>
  );
}
