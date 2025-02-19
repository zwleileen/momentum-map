const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/friends`;

const sendFriendRequest = async () => {
  try {
    const response = await fetch(`${BASE_URL}/request`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    throw new error("Sending Friend request failed.");
  }
};

const acceptFriendRequest = async (requestFriendId) => {
  try {
    const response = await fetch(`${BASE_URL}/accept/:${requestFriendId}`, {
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

export { sendFriendRequest, acceptFriendRequest };
