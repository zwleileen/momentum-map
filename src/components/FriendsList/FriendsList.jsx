import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as valuesService from "../../services/valuesService";
import { Link } from "react-router-dom"; 

const FriendsList = ({ users, valuesResults }) => {
  const { user } = useContext(UserContext);
  const [ matches, setMatches ] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (!user) return;
        const matchedUsers = await valuesService.getMatches();
        console.log(matchedUsers);
        setMatches(matchedUsers);
      } catch (error) {
        console.error("Error finding matches:", error);
      }
    };
    fetchMatches();
  }, [user]);


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
