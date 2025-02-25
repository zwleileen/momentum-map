# Project 3: Momentum Map
This project is about developing a React App using MongoDB, Node and Express. We used Material UI library for the user interface of our app. Our app helps individuals to find friends based on matching values. You can try it [here](https://momentum-map.netlify.app/).

# Description 
Knowing people you can connect with and share the same values can help with overall wellbeing. Momentum Map helps users to clarify their values using a questionnaire extracted from Schwartz Theory of Basic Values. Users can then find others with matching values on the app and befriend them. 

![Landing page](https://i.imgur.com/tCInkkC.png)

# User story (includes wireframe)
The user stories and wireframes for this app can be found on this public [trello board](https://trello.com/b/Z2nMQVJP/project-3).

# Pseudocode
These are the variables for the initial state:
```javascript

```
There are 15 components:
1. SignInForm: for existing user to sign in
2. SignUpForm: for new user to sign up
3. NavBar: to navigate user between pages
4. Landing Page: where all users (new and existing) land, new user will be navigated to take the questionnaire, while existing user will be navigated to sign in
5. ValuesForm: displays questionnaire extracted from Schwartz Theory of Basic Values and computes results
6. ValuesResults: displays results of the values ranking in more detail
7. Dashboard: displays overview of values results and friends
8. FriendsList: where user can send friend requests to others based on matching values
9. FriendProfile: shows overview of values and friends 
10. FriendShow: shows list of friends
11. FriendRequest: allows user to send friend requests to others
12. FriendRequestList: shows list of friend requests received from others
13. DeleteFriendButton: remove existing friend
14. Message: allows friends to send messages to each other
15. MessageList: shows messages sent from friends

# Key learnings
## Directly fetch users with matching values from MongoDB using Aggregation Pipeline
This learning references the [Aggregation Operations](https://www.mongodb.com/docs/atlas/atlas-ui/agg-pipeline/) page in MongoDB Manual.

In this app, in order to display a list of users based on matching values, we have fetched all values from the MongoDB and apply the filters backend to return the results to frontend. A much more efficient approach would be to directly apply the filters while fetching from MongoDB. 

One way to do so is to use the MongoDB Aggregations method which performs operations in stages on the documents stored in MongoDB directly. There is a tab in MongoDB Compass titled "Aggregations" where you can perform operations in stages and generate a set of codes. This is roughly how the method will look like for fetching matching values directly from MongoDB, with code extracted from the MongoDB Compass:
```javascript
router.get("/matches", verifyToken, async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const userValues = await Value.findOne({ name: currentUserId }).lean();

    if (!userValues) {
      return res.status(404).json({ error: "User values not found." });
    }

    const getTop3Values = (valuesObj) =>
      Object.entries(valuesObj)
        .sort(([, aScore], [, bScore]) => bScore - aScore)
        .slice(0, 3)
        .map(([name]) => name);

    const userTop3 = getTop3Values(userValues.values);

    // MongoDB Aggregation Pipeline
    const matches = await Value.aggregate([
  {
    '$match': {
      'name': {
        '$ne': new ObjectId('67b2c9e046c71c3e7384efa6')
      }
    }
  }, {
    '$project': {
      'name': 1, 
      'valuesArray': {
        '$objectToArray': '$values'
      }
    }
  }, {
    '$addFields': {
      'top3': {
        '$slice': [
          {
            '$map': {
              'input': {
                '$slice': [
                  {
                    '$sortArray': {
                      'input': '$valuesArray', 
                      'sortBy': {
                        'v': -1
                      }
                    }
                  }, 3
                ]
              }, 
              'as': 'item', 
              'in': '$$item.k'
            }
          }, 3
        ]
      }
    }
  }, {
    '$addFields': {
      'matchedCount': {
        '$size': {
          '$setIntersection': [
            '$top3', [
              'Universalism', 'Achievement', 'Benevolence'
            ]
          ]
        }
      }
    }
  }, {
    '$match': {
      'matchedCount': {
        '$gte': 2
      }
    }
  }, {
    '$lookup': {
      'from': 'users', 
      'localField': 'name', 
      'foreignField': '_id', 
      'as': 'userInfo'
    }
  }, {
    '$project': {
      '_id': 0, 
      'userId': '$name', 
      'username': {
        '$arrayElemAt': [
          '$userInfo.username', 0
        ]
      }, 
      'top3': 1, 
      'matchedCount': 1
    }
  }
]);

    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
```

## Learning 2
When the user lands on their dashboard, they would be able to see a friend request counter, that meant we had to have a request service upon loading of the dashboard page as shown below:
```
  const [friendRequestCount, setFriendRequestCount] = useState(0);

  useEffect(() => {
    const fetchFriendRequestCount = async () => {
      try {
        const requests = await friendsService.indexRequestFriends("pending");
        await setFriendRequestCount(requests.currentUserRequests.length);
        console.log("FRC", requests.currentUserRequests.length);
      } catch (err) {
        console.log("Error fetching friend requests:", err);
      }
    };
    fetchFriendRequestCount();
  }, [friendRequestCount]);
```

```  
              {showFriend ? (
                <>
                  <Badge badgeContent={friendRequestCount} color="primary"></Badge>
                  <PeopleIcon />
                  <Button variant="text" onClick={() => handleButton()}>
                    Requests
                  </Button>
                </>
```

## Learning 3
Because of the way our data was structured when a friendship is accepted, our delete friends function had to ensure that both instances had to be deleted from the database.

The frontend fed the user's ID being deleted

```
import { useNavigate } from "react-router-dom";
import friendsService from "../../services/friendsService";
import { Button } from "@mui/material";

const DeleteFriendButton = ({ userIdToDelete }) => {
  const navigate = useNavigate();

  const handleDeleteButton = async (userIdToDelete) => {
    try{
    await friendsService.deleteFriend(userIdToDelete);
    navigate("/users");
    } catch (error) {
      console.error("Error deleting friend:", error);
    }
  };

  return (
    <Button
      color="primary"
      variant="outlined"
      onClick={() => handleDeleteButton(userIdToDelete)}
      sx={{ mt: 2 }}
    >
      Remove Friend
    </Button>
  );
};

export default DeleteFriendButton;
```
For the backend to find the two instances to delete, it had to find based on "recipientID: UserDeleted" as well as "requesterID: UserDeleted" with the code below:
```
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const requesterId = req.params.userId;
    const friends = await Friend.find({
      requester: requesterId,
      status: "accepted",
    }).populate("recipient");
    console.log(friends);
    res.json(friends);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Deletes friend (user deletes userId)
router.delete("/:userId", verifyToken, async (req, res) => {
  const userId = req.user._id;
  const userIdToDelete = req.params.userId;

  try {
    const friendAgreementId1 = await Friend.find({
      requester: userIdToDelete,
      recipient: userId,
      status: "accepted",
    });
    const friendAgreementId2 = await Friend.find({
      requester: userId,
      recipient: userIdToDelete,
      status: "accepted",
    });

    const friendAgreementsToDelete = [
      ...friendAgreementId1,
      ...friendAgreementId2,
    ];
    const idsToDelete = friendAgreementsToDelete.map(
      (agreement) => agreement._id
    );

    // https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteMany/
    // note: deleteMany works with filter objects that differs from deleteOne

    const result = await Friend.deleteMany({ _id: { $in: idsToDelete } });

    res.status(200).json({
      message: `${result.deletedCount} agreements deleted`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting agreements",
    });
  }
});
```
  
# Planned future enhancements
1. Directly fetch users with matching values instead of filtering
2. Add more profiling features e.g. hobbies and/or more nuanced profiling e.g. more granular values profile
3. Refreshes friends request list to not display a request after it is accepted.
4. Have the dashboard show the user's actual name instead of their login username. This would include checks for no symbols and numbers in their name and storing it as a separate field.
