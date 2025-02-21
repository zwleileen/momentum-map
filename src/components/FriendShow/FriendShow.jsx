const FriendShow = ({ users }) => {
  console.log("Received users in FriendShow:", users); 

  return (
    <>
      <h2>Friend's List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </>
  );
};

export default FriendShow;
