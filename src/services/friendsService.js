const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/friends`;

const indexFriends = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { indexFriends };