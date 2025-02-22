import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";
import { useNavigate } from "react-router-dom";
import FriendRequest from "../FriendRequest/FriendRequest";
import FriendShow from "../FriendShow/FriendShow";
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';

const Dashboard = (props) => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [showFriend, setShowFriend] = useState(false); // using this state to toggle between showFriends or showRequests

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (user) {
          const fetchedUsers = await userService.index();
          setUsers(fetchedUsers);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  const topValues =
    props.valuesResults && props.valuesResults.values
      ? Object.entries(props.valuesResults.values)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
      : [];

  const formatValueName = (valueName) => {
    const replacements = {
      SelfDirection: "Self-Direction",
    };
    return replacements[valueName] || valueName; // If found, replace; otherwise, return as is
  };

  const handleButton = () => {
    //consoditating click to navigate to /users and  toggle state showFriend and setShowFriend.
    // navigate("/users");
    setShowFriend(!showFriend);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{mt:4}}>{user.username}'s Profile</Typography>
      <Box sx={{display:"flex", justifyContent:"space-evenly", gap: 4, mt: 4}}>
      
      <Box sx={{flex: 1, display: "flex", flexDirection: "column"}}>
        <Paper elevation={3} sx={{width: "100%", display:"flex", flexDirection:"column", flex:1}}>
        <Typography variant="h5" sx={{ml:2, mt:2}}>Top 5 Values</Typography>
        {topValues.length ? (
          <List sx={{py:1}}>
            {topValues.map(([key]) => (
              <ListItem key={key} sx={{py:0.5}}><ListItemText primary={formatValueName(key)}/></ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">No values to show yet</Typography>
        )}
        <Button variant="text" onClick={() => navigate("/values")} sx={{mb:2, ml:1}}>See more</Button>
        </Paper>
      </Box>
      
      <Box sx={{flex: 1, display: "flex", flexDirection: "column"}}>
        <Paper elevation={3} sx={{height: "100%", display:"flex", flexDirection:"column", flex:1}}>
        <Box sx={{flexGrow:1}}>
        {showFriend ? (
          <FriendShow users={users} user={user} />
        ) : (
          <FriendRequest user={user} />
        )}
        </Box>
        {/* <FriendShow users={users} />
        <FriendRequest /> */}
        {/* <h2>Friends</h2>

        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul> */}
        
        <Box sx={{display:"flex", justifyContent:"center", mb:2}}>
        {showFriend ? (
          <Button variant="text" onClick={() => handleButton()}>Requests</Button>
        ) : (
          <Button variant="text" onClick={() => handleButton()}>Friends</Button>
        )}

        <Button variant="text" onClick={() => navigate("/users")}>Find Friends</Button>

        {/* <button onClick={() => handleButton()}>Requests/Friends</button>
        <button onClick={() => handleButton()}>Requests/Friends</button>
        <button onClick={() => navigate("/users")}>Find Friends</button> */}
        </Box>
      </Paper>
      </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
