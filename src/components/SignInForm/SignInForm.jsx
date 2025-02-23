import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import { 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Box,
  Stack,
} from '@mui/material';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <p>{message}</p>
      <Box component="form" autoComplete='off' onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{mb:2, mt:4}}>Sign In</Typography>
        
      <TextField 
      label='Username'
      type='text'
      autoComplete='off'
      id='username'
      value={formData.username}
      name='username'
      onChange={handleChange}
      required
      size="medium"
      sx={{mr: 2}}
      />
      
      <TextField 
      label='Password'
      type='password'
      autoComplete='off'
      id='password'
      value={formData.password}
      name='password'
      onChange={handleChange}
      required
      size="medium"
      />
      
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={handleSubmit}>Sign In</Button>
        <Button variant="outlined" onClick={() => navigate('/')}>Cancel</Button>
      </Stack>
      </Box>
    </Container>
  );
};

export default SignInForm;
