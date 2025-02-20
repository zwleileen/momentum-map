import { useParams } from "react-router";
import { useEffect } from "react";
import friendsService from "../../services/friendsService";
import { useState } from "react";

const FriendShowtest = ({friendValues}) => {
  const [acceptedFriendsList, setAcceptedFriendsList] = useState([]);
  const userId = friendValues._id;
  useEffect(() => {
    const fetchFriends = async () => {
      const data = await friendsService.indexFriends(userId);
      setAcceptedFriendsList(data);
    };
    fetchFriends();
  }, []);

  console.log("USERID", friendValues._id); 

  return (
    <>
      <h2>{friendValues.username}'s Friends</h2>
      <ul>{
        acceptedFriendsList.map((friend)=>(
          <li key={friend._id}>{friend.recipient.username}</li>
        )
        )}
      </ul>
    </>
  );
};

export default FriendShowtest;
