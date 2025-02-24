import { useContext, useEffect, useState } from "react";
import * as messageService from '../../services/messageService';
import { UserContext } from "../../contexts/UserContext";
import {
    Container,
    Typography,
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Paper,
  } from "@mui/material";
import { useNavigate } from "react-router";

const MessagesList = () => {
    const { user } = useContext(UserContext);
    const [ messages, setMessages ] = useState([]);
    const navigate = useNavigate();

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
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" sx={{mb:4}}>Messages from friends</Typography>
        <Paper
            elevation={3}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
        {messages.length > 0 ? (
            <List sx={{mt:1}}>
                {messages.map((msg) => (
                    <ListItem key={msg._id} sx={{ py: 0, minHeight: "unset" }}>
                        <ListItemText 
                        primary={msg.sender.username}
                        secondary={msg.text}
                        sx={{margin:0, mb:2}}
                        />
                        <Button variant="text" onClick={() => navigate(`/users/${msg.sender._id}`)}>Reply</Button>
                        <Button variant="text" onClick={() => handleDelete(msg._id)}>Delete</Button>
                    </ListItem>
                ))}
            </List>
        ) : (
            <p>No message to show</p>
        )}
        </Paper>
        </Box>
    )
}

export default MessagesList