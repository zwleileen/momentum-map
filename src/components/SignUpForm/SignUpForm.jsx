import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import { 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Box,
  Stack,
} from '@mui/material';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Container maxWidth="sm">
      <p>{message}</p>
      <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{mb:2}}>Sign Up</Typography>
      
      <TextField
      label='Username'
      type='text'
      id='name'
      value={capitalizeFirstLetter(username)}
      name='username'
      onChange={handleChange}
      required
      size="medium"
      sx={{mr: 2, mb: 2}}
      />

      <Stack direction="row" spacing={2}>
      <TextField 
      label="Password"
      type='password'
      id='password'
      value={password}
      name='password'
      onChange={handleChange}
      required
      />
      
      <TextField 
      label="Confirm Password"
      type='password'
      id='confirm'
      value={passwordConf}
      name='passwordConf'
      onChange={handleChange}
      required
      />
      
      </Stack>  
      
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="outlined" disabled={isFormInvalid()}>Sign Up</Button>
          <Button variant="outlined" onClick={() => navigate('/')}>Cancel</Button>
      </Stack>
      </Box>
    </Container>
  );
};

export default SignUpForm;
