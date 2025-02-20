import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as valuesService from "../../services/valuesService";
import friendsService from "../../services/friendsService";

const FriendProfile = ({ users }) => {
  const { friendId } = useParams();
  const [friendValues, setFriendValues] = useState();

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

  // ✅ Avoid errors by showing "Loading..." until `friendValues` is available
  if (!friendValues || !friendValues.name || !friendValues.name.username) {
    return <p>Loading friend data...</p>;
  }

  const valuesArray = friendValues?.values
    ? Object.entries(friendValues.values).sort((a, b) => b[1] - a[1])
    : [];
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

  const sortedHigherOrderValues = Object.entries(higherOrderValues).sort(
    (a, b) => b[1] - a[1]
  );

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
      {friendValues.name.username}'s Profile!
      <div>
        <h1>{friendValues.name.username}'s Values Ranking</h1>
        <h3>Basic Values</h3>
        {valuesArray ? (
          <ul>
            {valuesArray.map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong>
                {value}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results to show yet!</p>
        )}
        ;<h3>Higher Order Values</h3>
        {sortedHigherOrderValues ? (
          <ul>
            {sortedHigherOrderValues.map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong>
                {value}
              </li>
            ))}
          </ul>
        ) : (
          <p>"</p>
        )}
        ;
      </div>
      <button onClick={() => handleButton()}>Send Friend Request Here</button>
    </main>
  );
};

export default FriendProfile;
