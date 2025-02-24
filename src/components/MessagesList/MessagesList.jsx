import { useContext, useEffect, useState } from "react";
import * as messageService from '../../services/messageService';
import { UserContext } from "../../contexts/UserContext";


const MessagesList = () => {
    const { user } = useContext(UserContext);
    const [ messages, setMessages ] = useState([]);

      useEffect(() => {
        const fetchMessages = async () => {
          try {
            if (user) {
              const fetchedMessages = await messageService.show(user._id);
    
              if (!fetchedMessages) {
                console.log("No messages to show");  // Debug log
                return;
              }
              console.log(fetchedMessages);
              setMessages(fetchedMessages);
            }
          } catch (err) {
            console.log("Error fetching messages:", err);
          }
        };
    
        fetchMessages();
      }, [user]);

    const handleDelete = async (messageId) => {
        try {
            await messageService.deleteMessage(messageId);
            setMessages(messages.filter((msg) => msg._id !== messageId))
        } catch (err) {
            console.error("Failed to delete message:", err);
        }
    }

    return (
        <>
        <h2>Messages from friends</h2>
        {messages.length > 0 ? (
            <ul>
                {messages.map((msg) => (
                    <li key={msg._id}>
                        <strong>{msg.sender.username}: </strong>
                        {msg.text}
                        <button onClick={() => handleDelete(msg._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        ) : (
            <p>No message to show</p>
        )}
        </>
    )
}

export default MessagesList