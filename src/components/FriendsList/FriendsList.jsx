import { useEffect, useState } from "react";
import * as userService from "../../services/userService";
import { Link } from "react-router";
import ValuesResults from "../ValuesResults/ValuesResults";

const FriendsList = ({ users, setUsers }) => {
  // const [users, setUsers] = useState([]);
  const [ matches, setMatches ] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        console.log(fetchedUsers); 
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [setUsers]);

  const getTop3Values = (valuesObj) => {
    return Object.entries(valuesObj).map(([name,score]) => ({name,score})).sort((a,b) => b.score - a.score).slice(0,3);
  }

  useEffect(() => {
    const findMatches = async () => {
      try {
        const allUsersValues = await valuesService.index();
        const userTop3 = getTop3Values(ValuesResults.values);

        const matchValues = allUsersValues.filter(otherUser => otherUser.name._id !== user._id).map(otherUser => {
          const otherUsersTop3 = getTop3Values(otherUser.values);
          return {
            user: otherUser.name,
            matchedValues: countMatches(userTop3, otherUsersTop3),
            top3values: otherUsersTop3
          }
        }).sort((a,b) => b.matchedValues - a.matchedValues);
        setMatches(matchValues);
      } catch (error) {
        console.error("Error finding matches:", error);
      }
    };
    if (user && ValuesResults.values) {
      findMatches();
    }
  }, [user, ValuesResults])

  return (
    <main>
      <ul>
        <h1>People with values that matched yours</h1>
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
