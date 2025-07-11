// components/NotificationPopup.js
import { useState } from "react";
import { FaBell, FaLock, FaUnlock } from "react-icons/fa";
import { useQuery, useQueryClient } from "react-query";
import { apiConnectorGet, apiConnectorPost } from "../../../utils/APIConnector";
import { endpoint } from "../../../utils/APIRoutes";

const NotificationPopup = ({ position = "absolute", bellClass = "" }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [openId, setOpenId] = useState(null);
    const queryClient = useQueryClient();

    const { data: unreadCountData } = useQuery(
        ["unread_notifications_count"],
        () => apiConnectorGet(endpoint?.unread_notifications_count)
    );
    const unreadCount = unreadCountData?.data?.result?.unreadCount || 0;

    const { data: notifications } = useQuery(
        ["notifications_list"],
        () => apiConnectorGet(endpoint?.notifications_list),
        { enabled: showNotifications }
    );

    const handleNotificationClick = async (notifId, isRead) => {
        setOpenId((prev) => (prev === notifId ? null : notifId));
        if (!isRead) {
            await apiConnectorPost(endpoint.mark_notification_read, { notificationId: notifId });
            queryClient.invalidateQueries(["unread_notifications_count"]);
            queryClient.invalidateQueries(["notifications_list"]);
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    return (
        <div className="relative">
            {/* Bell Icon */}
            <div className={`relative cursor-pointer ${bellClass}`} onClick={() => setShowNotifications(!showNotifications)}>
                <FaBell className="text-xl" />
                <span className={`absolute -top-2 -right-2 rounded-full text-xs w-5 h-5 flex items-center justify-center 
          ${unreadCount > 0 ? 'bg-red-500' : 'bg-gray-500'} text-white`}>
                    {unreadCount}
                </span>
            </div>

            {/* Popup */}
            {showNotifications && (
                <div className={`
    fixed lg:absolute top-16 right-4 
    w-[90vw] sm:w-80 max-h-[70vh] 
    bg-white shadow-lg rounded-md 
    overflow-y-auto text-black border z-[9999]
  `}>
                    <h3 className="font-bold p-3 border-b bg-gray-100">Notifications</h3>
                    <ul>
                        {notifications?.data?.result?.length > 0 ? (
                            notifications.data.result.map((notif) => (
                                <li
                                    key={notif.id}
                                    className={`p-3 border-b cursor-pointer hover:bg-gray-100 transition`}
                                    onClick={() => handleNotificationClick(notif.id, notif.is_read)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-semibold text-sm">{notif.title}</h4>
                                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                                {notif.is_read ? <FaUnlock /> : <FaLock />}
                                                {formatDate(notif.created_at)}
                                            </div>
                                        </div>
                                    </div>
                                    {openId === notif.id && (
                                        <div className="mt-2 text-sm text-gray-700">{notif.body}</div>
                                    )}
                                </li>
                            ))
                        ) : (
                            <li className="p-3 text-center text-gray-600">No notifications</li>
                        )}
                    </ul>
                </div>
            )}

        </div>
    );
};

export default NotificationPopup;
