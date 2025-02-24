import { useState } from 'react';
import * as messageService from '../../services/messageService';

const Message = () => {
    const [formData, setFormData] = useState({ text: '' });
    
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const newMessage = await messageService.create(formData);
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