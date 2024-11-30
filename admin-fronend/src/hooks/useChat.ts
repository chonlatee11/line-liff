import { useState } from "react";

export const useChat = () => {
    const [messages, setMessages] = useState([
        { user: 'Agent', time: '11:00', text: 'Hello' },
        { user: 'User', time: '11:01', text: 'Hi, There' },
    ]);
    const [blocked, setBlocked] = useState(false);

    const sendMessage = (text: string) => {
        setMessages([...messages, { user: 'Agent', time: new Date().toLocaleTimeString(), text }]);
    };

    return { messages, sendMessage, blocked };
};
