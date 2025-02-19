import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as valuesService from '../../services/valuesService';

const FriendProfile = () => {
  const { friendId } = useParams();
  const [ friendValues, setFriendValues ] = useState();

  useEffect(() => {
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

    return (
      <main>
        {friendId}'s Profile!
        <div>
        <h1>Values for User {friendId}</h1>
        {friendValues ? (
        <pre>{JSON.stringify(friendValues, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
      </main>
    );
  };
  
  export default FriendProfile;
  