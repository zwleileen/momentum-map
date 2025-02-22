// import { useEffect } from "react";
import friendsService from "../../services/friendsService";
import { useNavigate } from "react-router";

const DeleteFriendButton = ({ userIdToDelete }) => {
    const navigate = useNavigate(); 
    userIdToDelete = "67b2c9e046c71c3e7384efa6";

    const handleDeleteButton = async () => {
        await friendsService.deleteFriend(userIdToDelete);
        navigate(`/users/${userIdToDelete}`);
        // useEffect(() => {
        //     const deleteFriend = async () => {
        //         await friendsService.deleteFriend(userIdToDelete);
        //         navigate(`/users/${userIdToDelete}`);
        //     };
        //     deleteFriend();
        //   }, [userIdToDelete]);
    };


    return (
      <button onClick={() => handleDeleteButton()}>Remove Friend</button>
    );
  };
  
  export default DeleteFriendButton;
  