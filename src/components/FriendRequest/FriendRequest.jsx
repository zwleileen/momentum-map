// import { useState } from "react";
import FriendRequestList from "../FriendRequestList/FriendRequestList";

const FriendRequest = ({ showFriend }) => {
  console.log("FriendRequest rendering, user:", user);
  return (
    <>
      <h2>Friend Requests</h2>
      <p>this is Friend Request Component site</p>
      <p>toggling friend request</p>
      <FriendRequestList showFriend={showFriend} />
    </>
  );
};

export default FriendRequest;
