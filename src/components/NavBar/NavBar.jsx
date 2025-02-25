import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="navbar">
      {user ? (
        <>
        <ul>
          <li><Button component={RouterLink} to='/' variant="outlined">Dashboard</Button></li>
          <li><Button component={RouterLink} to='/' variant="outlined" onClick={handleSignOut}>Sign Out</Button></li>
        </ul>
        <Typography variant="h4">Welcome, {user.username}</Typography>
        </>
      ) : (
        <ul>
          <li><Button component={RouterLink} to='/' variant="outlined">Home</Button></li>
          {/* <li><Button component={RouterLink} to='/sign-up' variant="outlined">Sign Up</Button></li> */}
          <li><Button component={RouterLink} to='/sign-in' variant="outlined">Sign In</Button></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
