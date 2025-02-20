import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as userService from '../../services/userService';
import { useNavigate } from 'react-router';

const Dashboard = (props) => {
  const { user } = useContext(UserContext);
  const [ users, setUsers ] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (user) {
          const fetchedUsers = await userService.index();
          setUsers(fetchedUsers);
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);


  const topValues = props.valuesResults && props.valuesResults.values
  ? Object.entries(props.valuesResults.values).sort((a, b) => b[1] - a[1]).slice(0, 5)
  : [];

  return (
    <main>
      <h1>{user.username}'s Profile</h1> 

      <div>
        <h2>Your Top 5 Values</h2>
        {topValues.length > 0 ? (
        <ul>
          {topValues.map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong>{value}
            </li>
          ))}
        </ul>
        ) : (
          <p>No values to show yet</p>
        )}
        <button onClick={() => navigate("/values")}>See more</button>
      </div>
      <div>
      <h2>Your Friends</h2>
        <button>All Friends</button>
        <button onClick={() => navigate("/users")}>Find Friends</button>
        <ul>
          {users.map(user => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Dashboard;
