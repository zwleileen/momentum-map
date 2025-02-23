import { useEffect, useState } from "react";
import friendsService from "../../services/friendsService";

const FriendRequestList = ({ userStatus }) => {
  const [users, setUsers] = useState([]);

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
    <div>
      <h2>Friend Requests</h2>
      {users.currentUserRequests?.length > 0 ? (
        <ul>
          {users.currentUserRequests.map((request) => (
            <li key={request._id}>
              {request.requester.username}
              <button onClick={() => handleButton(request._id)}>
                {/*passing mongodb ID to easily change status without finding again. */}
                Accept
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No friend requests</p>
      )}
    </div>
  );
};

export default FriendRequestList;
