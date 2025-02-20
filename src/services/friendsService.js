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

// hardcoded works
const indexFriends = async (userId) => {
  try {
    const url = `${BASE_URL}/${userId}`; // Construct the URL with the requesterId
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default { sendFriendRequest, acceptFriendRequest, indexFriends };
