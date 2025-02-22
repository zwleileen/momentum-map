import { useEffect, useState } from "react";
import friendsService from "../../services/friendsService";

const FriendRequestList = async ({ user }) => {
  const [users, setUsers] = useState([]);
  console.log(user);
  useEffect(() => {
    try {
      const userList = friendsService.indexRequestFriends();
      console.log(userList);
    } catch (err) {
      console.log(`test error msg`, err);
    }
  });

  return (
    <>
      <h2>Friend Requests LIST HERE Component Check</h2>
    </>
  );
};

export default FriendRequestList;
