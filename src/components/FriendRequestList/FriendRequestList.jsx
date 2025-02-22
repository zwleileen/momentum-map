import { useEffect, useState } from "react";
import friendsService from "../../services/friendsService";

const FriendRequestList = ({ user }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const requests = await friendsService.indexRequestFriends();
        setUsers(requests);
        console.log("Friend requests:", requests); // For debugging
      } catch (err) {
        console.log("Error fetching friend requests:", err);
      }
    };

    fetchFriendRequests();
  }, []); // Empty dependency array since we want to fetch only once on mount

  return (
    <>
      <h2>Friend Requests LIST HERE Component Check</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No friend requests</p>
      )}
    </>
  );
};

export default FriendRequestList;
