import { useNavigate } from "react-router";
import friendsService from "../../services/friendsService";
import { Button } from "@mui/material";

const DeleteFriendButton = ({ userIdToDelete }) => {
  const handleDeleteButton = async (userIdToDelete) => {
    const navigate = useNavigate();
    try{
    await friendsService.deleteFriend(userIdToDelete);
    navigate("/users");
    //   possibly use navigate(`/users/${userIdToDelete}`); together with state change for react to detect and reload
    } catch (error) {
      console.error("Error deleting friend:", error);
    }
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
