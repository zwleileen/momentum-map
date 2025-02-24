// import { useState } from "react";
import FriendRequestList from "../FriendRequestList/FriendRequestList";

const FriendRequest = ({ user }) => {
  // arguement for user, was used in old code. Keeping it as it may be used for other things.
  return (
    <>
      <FriendRequestList userStatus="pending" />{" "}
      {/*You can change the pending and reuse teh FriendRequestList component to search for recipients with other status*/}
    </>
  );
};

export default FriendRequest;
