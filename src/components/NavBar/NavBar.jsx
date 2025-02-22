import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';
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
        <ul>
          <li>Welcome, {user.username}</li>
          <li><Button component={RouterLink} to='/' variant="outlined">Dashboard</Button></li>
          <li><Button component={RouterLink} to='/' variant="outlined" onClick={handleSignOut}>Sign Out</Button></li>
        </ul>
      ) : (
        <ul>
          <li><Button component={RouterLink} to='/' variant="outlined">Home</Button></li>
          <li><Button component={RouterLink} to='/sign-in' variant="outlined">Sign In</Button></li>
          {/* <li><Link to='/sign-up'>Sign Up</Link></li> */}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
