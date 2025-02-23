import friendsService from "../../services/friendsService";
import { Button } from "@mui/material";

const DeleteFriendButton = ({ userIdToDelete }) => {
  const handleDeleteButton = async (userIdToDelete) => {
    await friendsService.deleteFriend(userIdToDelete);
    window.location.reload();
    //   possibly use navigate(`/users/${userIdToDelete}`); together with state change for react to detect and reload
  };

  return (
    <Button
      variant="outlined"
      onClick={() => handleDeleteButton(userIdToDelete)}
      sx={{ mt: 2 }}
    >
      Remove Friend
    </Button>
  );
};

export default DeleteFriendButton;
