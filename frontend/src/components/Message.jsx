import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function Message({ message }) {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    // Function to format time as HH:MM
    const formatTime = (timestamp) => {
        if (!timestamp) return ''; // Check if timestamp is missing or falsy

        const date = new Date(timestamp);
        if (isNaN(date)) return ''; // Check if timestamp is invalid

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <div>
            <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Profile"
                            src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto} />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-50 text-white">{formatTime(message.timestamp)}</time>
                </div>
                <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''}`}>
                    {message?.message}
                </div>
            </div>
        </div>
    );
}

export default Message;
