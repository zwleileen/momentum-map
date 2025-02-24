// import { useState } from "react";
import FriendRequestList from "../FriendRequestList/FriendRequestList";

const FriendRequest = ({ user }) => {
  return (
    <>
      <FriendRequestList userStatus="pending" />
    </>
  );
};

export default FriendRequest;
