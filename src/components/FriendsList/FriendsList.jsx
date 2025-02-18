import { useEffect, useState } from "react";
import * as userService from "../../services/userService";
import { Link } from "react-router";

const FriendsList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <main>
      <ul>
        <h1>Others On Momentum Map!</h1>
        {users.map((user, index) => (
          <li key={index}>
          <Link to={`/users/${user._id}`} >{user.username}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default FriendsList;
