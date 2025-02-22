// import { useState } from "react";
import FriendRequestList from "../FriendRequestList/FriendRequestList";

const FriendRequest = ({ user }) => {
  console.log(user);
  return (
    <>
      <h2>Friend Requests</h2>
      <p>this is Friend Request Component site</p>
      <p>toggling friend request</p>
      <FriendRequestList />
    </>
  );
};

export default FriendRequest;
