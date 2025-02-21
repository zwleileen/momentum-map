import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as valuesService from "../../services/valuesService";
import { Link } from "react-router-dom"; 

const FriendsList = ({ users, valuesResults }) => {
  const { user } = useContext(UserContext);
  const [ matches, setMatches ] = useState([]);
  const [ exactMatches, setExactMatches ] = useState(1);
  const [ showMatches, setShowMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (!user) return;
        const matchedUsers = await valuesService.getMatches();
        console.log(matchedUsers);
        setShowMatches(matchedUsers);
        setMatches(matchedUsers);
      } catch (error) {
        console.error("Error finding matches:", error);
      }
    };
    fetchMatches();
  }, [user]);

  useEffect(() => {
    const filteredMatches = showMatches.filter(match => match.matchedValues === exactMatches);
    setMatches(filteredMatches);
  }, [exactMatches, showMatches]);


  return (
    <main>
      <h1>People with values that matched yours</h1>

      <div>
        <label htmlFor="exactMatches">No. of matching values: </label>
        <select id="exactMatches" value={exactMatches} onChange={(e)=>setExactMatches(Number(e.target.value))}>
          <option value={1}>1 match</option>
          <option value={2}>2 matches</option>
          <option value={3}>3 matches</option>
        </select>
      </div>

      {matches.length > 0 ? (
        matches.map((match) => (
          <div key={match.user._id}>
            <h3>
              <Link to={`/users/${match.user._id}`}>{match.user.username}</Link>
            </h3>
            {/* <p>Matching Values: {match.matchedValues}</p> */}
            <p>Their Top 3 Values:</p>
            <ul>
              {match.top3Values.map((value, index) => (
                <li key={index}>{value.name}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No matches found. Try changing the no. of matching values.</p>
      )}
    </main>
  );
};

export default FriendsList;
