// import { useState } from "react";
import FriendRequestList from "../FriendRequestList/FriendRequestList";

const FriendRequest = ({ user }) => {
  //console.log("FriendRequest rendering, user:", user); // May not need. Undoing old code. Leaving as just in case. //TODO (a) to be cleaned up later.
  return (
    <>
      <h2>Friend Requests</h2>
      <p>this is Friend Request Component site</p>
      <p>toggling friend request</p>
      <FriendRequestList userStatus="pending" />
    </>
  );
};

export default FriendRequest;
