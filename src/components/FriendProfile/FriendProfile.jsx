import { useEffect, useState, useContext } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import * as valuesService from "../../services/valuesService";
import friendsService from "../../services/friendsService";
import FriendShow from "../FriendShow/FriendShow";
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
import DeleteFriendButton from "../DeleteFriendButton/DeleteFriendButton";
import PeopleIcon from "@mui/icons-material/People";
import Message from "../Message/Message";

const FriendProfile = ({ users }) => {
  const { friendId } = useParams();
  const { user } = useContext(UserContext);
  const [friendValues, setFriendValues] = useState();
  const [isFriendsWithUser, setIsFriendsWithUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("friendId:", friendId);
    const fetchValues = async () => {
      try {
        if (friendId) {
          const fetchedValues = await valuesService.show(friendId);
          // console.log(fetchedValues);
          setFriendValues(fetchedValues);
        }
      } catch (err) {
        console.log("Error fetching values:", err);
      }
    };

    fetchValues();
  }, [friendId]);

  // Check if user is friends with FriendProfile
  useEffect(() => {
    const checkIsFriendsWithUser = async () => {
      const data = await friendsService.indexFriends(friendId);
      const allFriends = [];
      for (let i = 0; i < data.length; i++) {
        allFriends.push(data[i].recipient._id);
      }
      if (allFriends.includes(user._id)) {
        setIsFriendsWithUser(true);
      } else {
        setIsFriendsWithUser(false);
      };
    };
    checkIsFriendsWithUser();
  }, [friendId, user._id]);

  // console.log("Users passed to FriendShow:", users);

  if (!friendValues || !friendValues.name || !friendValues.name.username) {
    return <p>Loading friend data...</p>;
  }

  const valuesArray = friendValues?.values
    ? Object.entries(friendValues.values).sort((a, b) => b[1] - a[1])
    : [];
  // console.log(valuesArray);

  const valuesObject = Object.fromEntries(valuesArray);

  // Compute higher-order values
  const higherOrderValues = {
    SelfTranscendence:
      (valuesObject.Universalism + valuesObject.Benevolence) / 2,
    Conservation:
      (valuesObject.Tradition +
        valuesObject.Conformity +
        valuesObject.Security) /
      3,
    SelfEnhancement: (valuesObject.Achievement + valuesObject.Power) / 2,
    OpennessToChange:
      (valuesObject.SelfDirection +
        valuesObject.Stimulation +
        valuesObject.Hedonism) /
      3,
  };

  const sortedHigherOrderValues = Object.entries(higherOrderValues).sort(
    (a, b) => b[1] - a[1]
  );

  const formatValueName = (valueName) => {
    const replacements = {
      SelfDirection: "Self-Direction",
      SelfTranscendence: "Self-Transcendence",
      OpennessToChange: "Openness To Change",
      SelfEnhancement: "Self-Enhancement",
    };
    return replacements[valueName] || valueName; // If found, replace; otherwise, return as is
  };

  const handleButton = async () => {
    try {
      const postRequest = await friendsService.sendFriendRequest(friendId);
      console.log(friendId);
      console.log(postRequest);
    } catch (error) {
      console.log(`Error posting friend request.`, error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ mt: 4 }}>
        {friendValues.name.username}'s Profile!
      </Typography>
      {isFriendsWithUser && (
        <>
          <PeopleIcon data-testid="people" /> Your Friend
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              gap: 4,
              mt: 4,
            }}
          >
          </Box>
        </>
      )}
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
            <Typography variant="h6" sx={{ ml: 2, mt: 2 }}>
              {friendValues.name.username}'s Values Ranking
            </Typography>
            <Typography variant="h6" sx={{ ml: 2, mt: 2 }}>
              Top 5 Basic Values
            </Typography>
            {valuesArray ? (
              <List sx={{ mt: 1 }}>
                {valuesArray.slice(0, 5).map(([key]) => (
                  <ListItem key={key} sx={{ py: 0, minHeight: "unset" }}>
                    <ListItemText
                      primary={formatValueName(key)}
                      sx={{ margin: 0 }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1">No results to show yet!</Typography>
            )}
            <Typography variant="h6" sx={{ ml: 2, mt: 2 }}>
              Top 2 Higher Order Values
            </Typography>
            {sortedHigherOrderValues ? (
              <List sx={{ mt: 1, mb: 2 }}>
                {sortedHigherOrderValues.slice(0, 2).map(([key]) => (
                  <ListItem key={key} sx={{ py: 0, minHeight: "unset" }}>
                    <ListItemText
                      primary={formatValueName(key)}
                      sx={{ margin: 0 }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <p>"</p>
            )}
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
            <FriendShow
              friendId={friendId}
              friendName={friendValues.name.username}
            />
          </Paper>

          {!isFriendsWithUser && (
            <>
          <Button
            variant="outlined"
            onClick={() => handleButton()}
            sx={{ mt: 2 }}
          >
            Send Friend Request Here
          </Button>
          </>
          )}

          {isFriendsWithUser && (
            <>
            <DeleteFriendButton userIdToDelete={friendId} />
            <Button
            variant="outlined"
            onClick={() => navigate(`/users/${friendId}/message`)}
            sx={{ mt: 2 }}
            >
              Send message
            </Button>
            </>
          )}
        </Box>
      </Box>

      <Box sx={{mt:4}}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default FriendProfile;
