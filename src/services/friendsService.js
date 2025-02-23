const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/friends`;

const sendFriendRequest = async (friendId) => {
  try {
    const response = await fetch(`${BASE_URL}/request`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipientId: friendId }),
    });
    return response.json();
  } catch (error) {
    throw new error("Sending Friend request failed.");
  }
};
const acceptFriendRequest = async (requestFriendId) => {
  try {
    const response = await fetch(`${BASE_URL}/accept/${requestFriendId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to accept friend request");
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error accepting friend request: ${error.message}`);
  }
};
const indexFriends = async (userId) => {
  try {
    const url = `${BASE_URL}/${userId}`;
    // console.log("URL",url);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
const indexRequestFriends = async (boolString) => {
  // console.log(`tseeeeeeeeeeeeeeeest ${boolString}`); // its pending
  try {
    const response = await fetch(`${BASE_URL}/accept`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status: boolString }),
    });
    console.log(`TESSSSSSSSSSSSSTTT: ${response}`);
    if (!response.ok) {
      throw new Error(`Failed in listing Friend Request List.`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Failed in listing Friend Request List: ${err.message}`);
  }
};
const updateRequestStatus = async (updateId, status) => {
  // params: updateId = mongoDB friendId, NOT requester/recipient id. && status = pending or accepted
  try {
    const response = await fetch(`${BASE_URL}/accept/update`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        updateId: updateId,
        status: status,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error in updating friend request status.`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Error in updating: ${err.message}`);
  }
};
const deleteFriend = async (userIdToDelete) => {
  try {
    const res = await fetch(`${BASE_URL}/${userIdToDelete}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export default {
  sendFriendRequest,
  acceptFriendRequest,
  indexFriends,
  deleteFriend,
  indexRequestFriends,
  updateRequestStatus,
};
