import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as valuesService from '../../services/valuesService';

const FriendProfile = () => {
  const { friendId } = useParams();
  const [ friendValues, setFriendValues ] = useState();

  useEffect(() => {
    // console.log("friendId:", friendId);
      const fetchValues = async () => {
        try {
          if (friendId) {
            const fetchedValues = await valuesService.show(friendId);
            console.log(fetchedValues);
            setFriendValues(fetchedValues);
          }
        } catch (err) {
          console.log("Error fetching values:", err);
        }
      };
  
      fetchValues();
    }, [friendId]);

  const valuesArray = friendValues?.values ? 
    Object.entries(friendValues.values).sort((a, b) => b[1] - a[1]) : [];
    // console.log(valuesArray);

  const valuesObject = Object.fromEntries(valuesArray);

  // Compute higher-order values
  const higherOrderValues = {
    SelfTranscendence: (valuesObject.Universalism + valuesObject.Benevolence) / 2,
    Conservation: (valuesObject.Tradition + valuesObject.Conformity + valuesObject.Security) / 3,
    SelfEnhancement: (valuesObject.Achievement + valuesObject.Power) / 2,
    OpennessToChange: (valuesObject.SelfDirection + valuesObject.Stimulation + valuesObject.Hedonism) / 3,
  };

  const sortedHigherOrderValues = Object.entries(higherOrderValues)
    .sort((a, b) => b[1] - a[1]);

    return (
      <main>
        {friendValues.name.username.toUpperCase()}'s Profile!
      <div>
        <h1>{friendValues.name.username.toUpperCase()}'s Values Ranking</h1>
        <h3>Basic Values</h3>
        <ul>
          {valuesArray.map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong>{value}
            </li>
          ))}
        </ul>
        
        <h3>Higher Order Values</h3>
        <ul>
          {sortedHigherOrderValues.map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong>{value}
            </li>
          ))}
        </ul>
    </div>
      </main>
    );
  };
  
  export default FriendProfile;
  