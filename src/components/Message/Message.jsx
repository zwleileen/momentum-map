import { useContext, useState } from 'react';
import * as messageService from '../../services/messageService';
import { useParams } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

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
        <>
        <form onSubmit={handleSubmit}>
        <label htmlFor='text-input'>Message:</label>
            <textarea
                required
                type='text'
                name='text'
                id='text-input'
                value={formData.text}
                onChange={handleChange}
            />
        <button type='submit'>Submit</button>
        </form>
        </>
    )
}

export default Message