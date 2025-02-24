import { useEffect, useState } from "react";
import friendsService from "../../services/friendsService";
import { Button } from "@mui/material";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

const FriendRequestList = ({ userStatus }) => {
  // current set to pending. Can be changed at parent side.
  const [users, setUsers] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState({});

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

    setDisabledButtons((prev) => ({ ...prev, [mongoID]: true })); // disable button if there is request._id

    try {
      const updateStatus = await friendsService.updateRequestStatus(
        mongoID,
        "accepted" // hardcoding it here for accepted. But better if it can receive from arguement. making this button more versaitile
      );

      console.log(updateStatus);
    } catch (err) {
      console.log("Error updating friend request status:", err);
      setDisabledButtons((prev) => ({ ...prev, [mongoID]: false })); // if theres error, reset back the button to enable
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ ml: 2, mt: 2 }}>
        Friend Requests
      </Typography>
      {users.currentUserRequests?.length > 0 ? ( // Ternery, allows toggle of what is sown in this component. aka, if friends than show friendlist, if no friends, show "no friends text"
        <List sx={{ mt: 1 }}>
          {users.currentUserRequests.map((request) => (
            <ListItem key={request._id} sx={{ py: 0, minHeight: "unset" }}>
              <ListItemText
                primary={request.requester.username}
                sx={{ margin: 0 }}
              />
              {"             "}

              <Button
                variant="text"
                onClick={() => handleButton(request._id)}
                disabled={disabledButtons[request._id]}
              >
                {/*passing mongodb ID to easily change status without finding again. */}
                Accept
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" sx={{ ml: 2, mt: 2 }}>
          No friend requests
        </Typography>
      )}
    </>
  );
};

export default FriendRequestList;
