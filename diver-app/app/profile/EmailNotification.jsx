import React, { useState, useEffect } from 'react'

const EmailNotification = ({notification}) => {
    const [button, SetButton] = useState(notification)

    useEffect(() => {
        const updateNotification = async () => {
            try {
                await fetch('/api/profile/notification', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ notification: button }),
                });
            } catch (error) {
                console.error('Failed to update notification state:', error);
            }
        };

        updateNotification();
    }, [button])

  return (
    <div className="bg-white border rounded-md p-4">
        <h2 className="text-lg mb-4">Email Notifications</h2>

        <div className="flex items-center justify-between">
            <div>
            <p className="text-sm font-medium">Booking Confirmations</p>
            <p className="text-xs text-gray-500">
                Notify when a booking is confirmed
            </p>
            </div>

            <button
            onClick={() => SetButton(!button)}
            className={`relative inline-flex h-5 w-10 rounded-full transition-colors ${
                button ? "bg-black" : "bg-gray-300"
            }`}
            >
            <span
                className={`absolute top-0.5 left-0.5 h-4 w-4 bg-white rounded-full transition-transform ${
                button
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
            />
            </button>
        </div>
        </div>

  )
}

export default EmailNotification