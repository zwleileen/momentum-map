import { useEffect, useState, useContext, useCallback } from "react";
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
  Badge,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import MessagesList from "../MessagesList/MessagesList";
import friendsService from "../../services/friendsService";

const Dashboard = (props) => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [showFriend, setShowFriend] = useState(true); // using this state to toggle between showFriends or showRequests
  const [friendRequestCount, setFriendRequestCount] = useState(0);

  useEffect(() => {
    const fetchFriendRequestCount = async () => {
      try {
        const requests = await friendsService.indexRequestFriends("pending");
        await setFriendRequestCount(requests.currentUserRequests.length);
        console.log("FRC", requests.currentUserRequests.length);
      } catch (err) {
        console.log("Error fetching friend requests:", err);
      }
    };
    fetchFriendRequestCount();
  }, [friendRequestCount]);

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
    //toggle state showFriend and setShowFriend. can be repurposed to consolidate click.
    // navigate("/users");
    setShowFriend(!showFriend);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ mt: 4 }}>
        {user.username}'s Profile
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "space-evenly", gap: 4, mt: 4 }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Typography variant="h5" sx={{ ml: 2, mt: 2 }}>
              Top 5 Values
            </Typography>
            {topValues.length ? (
              <List sx={{ mt: 1 }}>
                {topValues.map(([key]) => (
                  <ListItem key={key} sx={{ py: 0, minHeight: "unset" }}>
                    <ListItemText
                      primary={formatValueName(key)}
                      sx={{ margin: 0 }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1">No values to show yet</Typography>
            )}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Button
                variant="text"
                onClick={() => navigate("/values")}
                sx={{ mb: 2, ml: 1 }}
              >
                See more
              </Button>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Paper
            elevation={3}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              {showFriend ? (
                <FriendShow friendId={user._id} friendName={user.username} />
              ) : (
                <FriendRequest user={showFriend} />
              )}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              {showFriend ? (
                <>
                  <Badge badgeContent={friendRequestCount} color="primary"></Badge>
                  <PeopleIcon />
                  <Button variant="text" onClick={() => handleButton()}>
                    Requests
                  </Button>
                </>
              ) : (
                <Button variant="text" onClick={() => handleButton()}>
                  Friends
                </Button>
              )}

              <Button variant="text" onClick={() => navigate("/users")}>
                Find Friends
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 8 }}>
        <MessagesList />
      </Box>
    </Container>
  );
};

export default Dashboard;
