import React, { useState, useEffect } from 'react';
import supabase from '../../supabaseClient';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching notifications:', error);
      } else {
        setNotifications(data); // Set initial notifications
      }
    };

    fetchNotifications();

    // Set up a real-time subscription in Supabase v2.x
    const channel = supabase
      .channel('public:notifications')  // Create a real-time channel
      .on(
        'postgres_changes',  // Listening for PostgreSQL changes
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          setNotifications((prevNotifications) => [payload.new, ...prevNotifications]);
        }
      )
      .subscribe();

    // Cleanup the subscription when the component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border border-gray-300 rounded shadow-md bg-white"
            >
              <h2 className="text-lg font-semibold">{notification.title}</h2>
              <p className="text-gray-700">{notification.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(notification.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No notifications found.</p>
      )}
    </div>
  );
};

export default Notifications;
