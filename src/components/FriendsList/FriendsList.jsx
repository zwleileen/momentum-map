import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as valuesService from "../../services/valuesService";

const FriendsList = ({ users, valuesResults }) => {
  const { user } = useContext(UserContext);
  const [ matches, setMatches ] = useState([]);

  const getTop3Values = (valuesObj) => {
    return Object.entries(valuesObj).map(([name,score]) => ({name,score})).sort((a,b) => b.score - a.score).slice(0,3);
  }

  const countMatches = (userTop3, otherUserTop3) => {
    const userValues = userTop3.map((val) => val.name);
    const otherValues = otherUserTop3.map((val) => val.name);
    return userValues.filter((val) => otherValues.includes(val)).length;
  };

  useEffect(() => {
    const findMatches = async () => {
      try {
        if (!user || !valuesResults || !valuesResults.values) return;

        const userTop3 = getTop3Values(valuesResults.values);
        const allUsersValues = await valuesService.index();

        const matchValues = allUsersValues
          .filter((otherUser) => otherUser.name._id !== user._id)
          .map((otherUser) => {
            const otherUsersTop3 = getTop3Values(otherUser.values);
            return {
              user: otherUser.name,
              matchedValues: countMatches(userTop3, otherUsersTop3),
              top3Values: otherUsersTop3,
            };
          })
          .sort((a, b) => b.matchedValues - a.matchedValues); // Sort by most matches

        setMatches(matchValues);
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
            <h3>{match.user.username}</h3>
            <p>Matching Values: {match.matchedValues}</p>
            <p>Their Top 3 Values:</p>
            <ul>
              {match.top3Values.map((value) => (
                <li key={value.name}>
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
