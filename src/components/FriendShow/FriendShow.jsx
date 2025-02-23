import { useEffect } from "react";
import friendsService from "../../services/friendsService";
import { useState } from "react";
import { Link } from "react-router";

const FriendShow = ( {friendId, friendName} ) => {
  const [acceptedFriendsList, setAcceptedFriendsList] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const data = await friendsService.indexFriends(friendId);
      setAcceptedFriendsList(data);
      // console.log(data)
    };
    fetchFriends();
  }, [friendId]);

  // console.log("AFL", acceptedFriendsList);

  return (
    <>
      <h2>{friendName}'s Friends</h2>
      <ul>{
        acceptedFriendsList.map((friend)=>(
          <li key={friend._id}>
            <Link to={`/users/${friend.recipient._id}`}>{friend.recipient.username}</Link>
          </li>
        )
        )}
      </ul>
    </>
  );
};

export default FriendShow;
