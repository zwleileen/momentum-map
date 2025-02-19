const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/friends`;

const sendFriendRequest = async () => {
  try {
    const response = await fetch(BASE_URL, {
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

export { sendFriendRequest };
