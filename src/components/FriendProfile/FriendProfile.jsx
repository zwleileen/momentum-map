import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as valuesService from "../../services/valuesService";
import friendsService from "../../services/friendsService";
import FriendShow from "../FriendShow/FriendShow";
import DeleteFriendButton from "../DeleteFriendButton/DeleteFriendButton";

const FriendProfile = ({ users }) => {
  const { friendId } = useParams();
  const [ friendValues, setFriendValues ] = useState();

  useEffect(() => {
    // console.log("friendId:", friendId);
    const fetchValues = async () => {
      try {
        if (friendId) {
          const fetchedValues = await valuesService.show(friendId);
          // console.log(fetchedValues);
          setFriendValues(fetchedValues);
        }
      } catch (err) {
        console.log("Error fetching values:", err);
      }
    };
    
    fetchValues();
  }, [friendId]);

  console.log("Users passed to FriendShow:", users);

  if (!friendValues || !friendValues.name || !friendValues.name.username) {
    return <p>Loading friend data...</p>;
  }

  const valuesArray = friendValues?.values ? 
    Object.entries(friendValues.values).sort((a, b) => b[1] - a[1]) : [];
    // console.log(valuesArray);

  const valuesObject = Object.fromEntries(valuesArray);

  // Compute higher-order values
  const higherOrderValues = {
    SelfTranscendence:
      (valuesObject.Universalism + valuesObject.Benevolence) / 2,
    Conservation:
      (valuesObject.Tradition +
        valuesObject.Conformity +
        valuesObject.Security) /
      3,
    SelfEnhancement: (valuesObject.Achievement + valuesObject.Power) / 2,
    OpennessToChange:
      (valuesObject.SelfDirection +
        valuesObject.Stimulation +
        valuesObject.Hedonism) /
      3,
  };

  const sortedHigherOrderValues = Object.entries(higherOrderValues)
    .sort((a, b) => b[1] - a[1]);
  
  const formatValueName = (valueName) => {
    const replacements = {
        "SelfDirection": "Self-Direction",
        "SelfTranscendence": "Self-Transcendence",
        "OpennessToChange": "Openness To Change",
        "SelfEnhancement": "Self-Enhancement"
    };
      return replacements[valueName] || valueName; // If found, replace; otherwise, return as is
  };

  const handleButton = async () => {
    try {
      const postRequest = await friendsService.sendFriendRequest(friendId);
      console.log(friendId);
      console.log(postRequest);
    } catch (error) {
      console.log(`Error posting friend request.`, error);
    }
  };

  
  return (
    <main>
      <h1>{friendValues.name.username}'s Profile!</h1>
      <div>
        <h2>{friendValues.name.username}'s Values Ranking</h2>
        <h3>Top 5 Basic Values</h3>
        { valuesArray ? (
        <ul>
          {valuesArray.slice(0,5).map(([key]) => (
            <li key={key}>{formatValueName(key)}</li>
          ))}
        </ul>
        ) : (
          <p>No results to show yet!</p>
        )}
        <h3>Top 2 Higher Order Values</h3>
        { sortedHigherOrderValues ? (
        <ul>
          {sortedHigherOrderValues.slice(0,2).map(([key]) => (
            <li key={key}>{formatValueName(key)}</li>
          ))}
        </ul>
        ) : (
          <p>"</p>
        )}
      </div>
      <button onClick={() => handleButton()}>Send Friend Request Here</button>
      <DeleteFriendButton />
      <FriendShow friendId={friendId} friendName={friendValues.name.username} />
    </main>
  );
};

export default FriendProfile;
