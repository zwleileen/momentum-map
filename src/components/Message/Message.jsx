import { useContext, useState } from 'react';
import * as messageService from '../../services/messageService';
import { useParams } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';

const Message = () => {
    const {friendId} = useParams(); //receiver Id
    const {user} = useContext(UserContext); //sender Id
    const [formData, setFormData] = useState({ text: '' });
    
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const message = {
            text: formData.text,
            sender: user._id,        // sender ID from logged-in user
            receiver: friendId,      // receiver ID from route parameter
          };
      
          try {
            const newMessage = await messageService.create(message);
            console.log("Message created:", newMessage);
            setFormData({ text: '' });
          } catch (error) {
            console.error("Error:", error.message);
          }
        };
      

    return (
        <Paper elevation={3} sx={{ p: 3, margin: '0 auto' }}>
        <Typography variant="h6" sx={{mb:2}}>Send a Message</Typography>
        <Box component="form" onSubmit={handleSubmit}>
        <TextField 
            id='text-input'
            required
            name='text'
            label='Message'
            value={formData.text}
            onChange={handleChange}
            multiline
            minRows={2}
            fullWidth
        />
        <Button variant="text" type='submit' sx={{mt:1}}>Submit</Button>
        </Box>
        </Paper>
    )
}

export default Message