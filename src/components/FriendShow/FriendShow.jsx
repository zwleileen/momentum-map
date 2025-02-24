import { useEffect } from "react";
import friendsService from "../../services/friendsService";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";

const FriendShow = ( {friendId, friendName} ) => {
  const [acceptedFriendsList, setAcceptedFriendsList] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const data = await friendsService.indexFriends(friendId);
      setAcceptedFriendsList(data);
    };
    fetchFriends();
  }, [friendId]);
  
  return (
    <>
      <Typography variant="h5" sx={{ml:2, mt:2}}>{friendName}'s Friends</Typography>
      <List sx={{mt:1}}>
        {acceptedFriendsList.map((friend)=>(
          <ListItem key={friend._id} sx={{ py: 0, minHeight: "unset" }}>
            <ListItemButton component={RouterLink} to={`/users/${friend.recipient._id}`}>
            <ListItemText primary={friend.recipient.username} sx={{ margin: 0, color:"#1976d2" }}/>
            </ListItemButton>
          </ListItem>
        )
        )}
      </List>
    </>
  );
};

export default FriendShow;
