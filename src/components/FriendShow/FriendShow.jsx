const FriendShow = ({ users, user }) => {
  

  return (
    <>
      <h2>{user.username}'s Friends</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </>
  );
};

export default FriendShow;
