import { useParams } from "react-router";
import { useEffect } from "react";
import friendsService from "../../services/friendsService";
import { useState } from "react";

// const FriendShow = ( {friendValues} ) => {
//   const [acceptedFriendsList, setAcceptedFriendsList] = useState([]);
//   const userId = friendValues._id;
//   useEffect(() => {
//     const fetchFriends = async () => {
//       const data = await friendsService.indexFriends(userId);
//       setAcceptedFriendsList(data);
//     };
//     fetchFriends();
//   }, []);

const FriendShow = ( {friendId, friendName} ) => {
  const [acceptedFriendsList, setAcceptedFriendsList] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const data = await friendsService.indexFriends(friendId);
      setAcceptedFriendsList(data);
    };
    fetchFriends();
  }, []);

  console.log(acceptedFriendsList);

  return (
    <>
      {/* <h2>{friendId.username}'s Friends</h2> */}
      <h2>{friendName}'s Friends</h2>
      <ul>{
        acceptedFriendsList.map((friend)=>(
          <li key={friend._id}>{friend.recipient.username}</li>
        )
        )}
      </ul>
    </>
  );
};

export default FriendShow;
