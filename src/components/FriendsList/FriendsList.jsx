import { useEffect } from "react";
import * as userService from "../../services/userService";
import { Link } from "react-router";

const FriendsList = ({ users, setUsers }) => {
  // const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        console.log(fetchedUsers); //amos testing
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [setUsers]);

  return (
    <main>
      <ul>
        <h1>Others On Momentum Map!</h1>
        {users.map((user) => (
          <li key={user._id}>
            <Link to={`/users/${user._id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default FriendsList;
