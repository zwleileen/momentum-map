import { useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";
import { useNavigate } from "react-router-dom";
import FriendRequest from "../FriendRequest/FriendRequest";
import FriendShow from "../FriendShow/FriendShow";

const Dashboard = (props) => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [showFriend, setShowFriend] = useState(true); // using this state to toggle between showFriends or showRequests

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (user) {
          const fetchedUsers = await userService.index();
          setUsers(fetchedUsers);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  const topValues =
    props.valuesResults && props.valuesResults.values
      ? Object.entries(props.valuesResults.values)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
      : [];

  const formatValueName = (valueName) => {
    const replacements = {
      SelfDirection: "Self-Direction",
    };
    return replacements[valueName] || valueName; // If found, replace; otherwise, return as is
  };

  const handleButton = () => {
    //consoditating click to navigate to /users and  toggle state showFriend and setShowFriend.
    // navigate("/users");
    setShowFriend(!showFriend);
  };

  return (
    <main>
      <h1>{user.username}'s Profile</h1>

      <div>
        <h2>Top 5 Values</h2>
        {topValues.length ? (
          <ul>
            {topValues.map(([key]) => (
              <li key={key}>{formatValueName(key)}</li>
            ))}
          </ul>
        ) : (
          <p>No values to show yet</p>
        )}
        <button onClick={() => navigate("/values")}>See more</button>
      </div>
      <div>
        {showFriend ? (
          <FriendShow friendId={user._id} friendName={user.username} />
        ) : (
          <FriendRequest showFriend={showFriend} />
        )}
        {/* <FriendShow users={users} />
        <FriendRequest /> */}
        {/* <h2>Friends</h2>

        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul> */}
        {showFriend ? (
          <button onClick={() => handleButton()}>Requests</button>
        ) : (
          <button onClick={() => handleButton()}>Friends</button>
        )}

        <button onClick={() => navigate("/users")}>Find Friends</button>

        {/* <button onClick={() => handleButton()}>Requests/Friends</button>
        <button onClick={() => handleButton()}>Requests/Friends</button>
        <button onClick={() => navigate("/users")}>Find Friends</button> */}
      </div>
    </main>
  );
};

export default Dashboard;
