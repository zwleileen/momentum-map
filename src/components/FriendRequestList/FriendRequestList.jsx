import { useEffect, useState } from "react";
import friendsService from "../../services/friendsService";
import { Button } from "@mui/material";
import {
  Typography,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

const FriendRequestList = ({ userStatus }) => {
  const [users, setUsers] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const requests = await friendsService.indexRequestFriends(userStatus);
        setUsers(requests);
        console.log(requests);
      } catch (err) {
        console.log("Error fetching friend requests:", err);
      }
    };

    fetchFriendRequests();
  }, [userStatus]);

  const handleButton = async (mongoID) => {
    console.log(`button pressed with id ${mongoID}`); // testing correct data giving to button. Contains MongoDB _id of the selected requester.
    // setButtonDisabled(true);
    try {
      const updateStatus = await friendsService.updateRequestStatus(
        mongoID,
        "accepted" // hardcoding it here for accepted. But better if it can receive from arguement. making this button more versaitile
      );

      console.log(updateStatus);
    } catch (err) {
      console.log("Error updating friend request status:", err);
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ml:2, mt:2}}>Friend Requests</Typography>
      {users.currentUserRequests?.length > 0 ? (
        <List sx={{mt:1}}>
          {users.currentUserRequests.map((request) => (
            <ListItem key={request._id} sx={{ py: 0, minHeight: "unset" }}>
              <ListItemText primary={request.requester.username} sx={{ margin: 0 }}/>
              {"             "}
              <Button variant="text" onClick={() => handleButton(request._id)}>
                {/*passing mongodb ID to easily change status without finding again. */}
                Accept
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No friend requests</p>
      )}
    </>
  );
};

export default FriendRequestList;
