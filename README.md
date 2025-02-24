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
This learning references the [Aggregation Operations](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/) page in MongoDB Manual.

In this app, 

## Learning 2
yyy
  
# Planned future enhancements
1. Directly fetch users with matching values instead of filtering
2. Add more profiling features e.g. hobbies and/or more nuanced profiling e.g. more granular values profile
