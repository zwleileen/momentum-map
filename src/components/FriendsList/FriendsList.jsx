import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as valuesService from "../../services/valuesService";
import { Link } from "react-router-dom"; 

const FriendsList = ({ users, valuesResults }) => {
  const { user } = useContext(UserContext);
  const [ matches, setMatches ] = useState([]);

  const getTop3Values = (valuesObj) => {
    return Object.entries(valuesObj).map(([name,score]) => ({name,score})).sort((a,b) => b.score - a.score).slice(0,3);
  }

  const countMatches = (userTop3, otherUserTop3) => {
    const userValues = userTop3.map((value) => value.name);
    const otherValues = otherUserTop3.map((value) => value.name);
    return userValues.filter((value) => otherValues.includes(value)).length;
  };

  useEffect(() => {
    const findMatches = async () => {
      try {
        if (!user || !valuesResults || !valuesResults.values) return;

        const userTop3 = getTop3Values(valuesResults.values);
        // console.log(userTop3);
        const allUsersValues = await valuesService.index();
        // console.log(allUsersValues);

        const matchValues = allUsersValues
          .filter((otherUser) => otherUser.name._id !== user._id)
          .map((otherUser) => {
            const otherUsersTop3 = getTop3Values(otherUser.values);
            // console.log(otherUser.name.username);
            return {
              user: { _id: otherUser.name._id, username: otherUser.name.username },
              matchedValues: countMatches(userTop3, otherUsersTop3),
              top3Values: otherUsersTop3,
            };
          })
          .sort((a, b) => b.matchedValues - a.matchedValues); 

        setMatches(matchValues);
        // console.log(matchValues);
      } catch (error) {
        console.error("Error finding matches:", error);
      }
    };

    findMatches();
  }, [user, valuesResults]);


  return (
    <main>
      <h1>People with values that matched yours</h1>
      {matches.length > 0 ? (
        matches.map((match) => (
          <div key={match.user._id}>
            <h3>
              <Link to={`/users/${match.user._id}`}>{match.user.username}</Link>
            </h3>
            <p>Matching Values: {match.matchedValues}</p>
            <p>Their Top 3 Values:</p>
            <ul>
              {match.top3Values.map((value, index) => (
                <li key={index}>
                  {value.name}: {value.score}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No matches found.</p>
      )}
    </main>
  );
};

export default FriendsList;
