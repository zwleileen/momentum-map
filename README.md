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
    $match:
      /**
       * query: The query in MQL.
       */
      {
        name: {
          $ne: ObjectId(
            "67b2c9e046c71c3e7384efa6"
          )
        }
      }
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        name: 1,
        valuesArray: {
          $objectToArray: "$values"
        }
      }
  },
  {
    $addFields:
      /**
       * newField: The new field name.
       * expression: The new field expression.
       */
      {
        top3: {
          $slice: [
            {
              $map: {
                input: {
                  $slice: [
                    {
                      $sortArray: {
                        input: "$valuesArray",
                        sortBy: {
                          v: -1
                        }
                      }
                    },
                    3
                  ]
                },
                as: "item",
                in: "$$item.k"
              }
            },
            3
          ]
        }
      }
  },
  {
    $addFields:
      /**
       * newField: The new field name.
       * expression: The new field expression.
       */
      {
        matchedCount: {
          $size: {
            $setIntersection: [
              "$top3",
              [
                "Universalism",
                "Achievement",
                "Benevolence"
              ]
            ]
          }
        }
      }
  },
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        matchedCount: {
          $gte: 2
        }
      }
  },
  {
    $lookup:
      /**
       * from: The target collection.
       * localField: The local join field.
       * foreignField: The target join field.
       * as: The name for the results.
       * pipeline: Optional pipeline to run on the foreign collection.
       * let: Optional variables to use in the pipeline field stages.
       */
      {
        from: "users",
        localField: "name",
        foreignField: "_id",
        as: "userInfo"
      }
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        _id: 0,
        userId: "$name",
        username: {
          $arrayElemAt: ["$userInfo.username", 0]
        },
        top3: 1,
        matchedCount: 1
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
yyy
  
# Planned future enhancements
1. Directly fetch users with matching values instead of filtering
2. Add more profiling features e.g. hobbies and/or more nuanced profiling e.g. more granular values profile
