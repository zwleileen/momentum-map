import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import './App.css'
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import FriendProfile from "./components/FriendProfile/FriendProfile";
import FriendsList from "./components/FriendsList/FriendsList";
import ValuesForm from "./components/ValuesForm/ValuesForm";
import ValuesResults from "./components/ValuesResults/ValuesResults";
import * as valuesService from "./services/valuesService";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useContext(UserContext);
  const [valuesResults, setValuesResults] = useState({});
  const [tempValues, setTempValues] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchValues = async () => {
      try {
        if (user) {
          const fetchedValues = await valuesService.show(user._id);
          setValuesResults(fetchedValues);
        }
      } catch (err) {
        console.log("Error fetching values:", err);
      }
    };

    fetchValues();
  }, [user]);

  const handleAddValues = async (averages) => {
    try {
      if (!user) {
        console.log("No user, storing temp values");
        setTempValues(averages);
        navigate("/sign-up");
        return;
      }

      let newValues;
      if (valuesResults._id) {
        newValues = await valuesService.update(averages);
      } else {
        newValues = await valuesService.create(averages);
      }
      setValuesResults(newValues);
      navigate("/");
    } catch (error) {
      console.error("Error creating values:", error);
    }
  };

  useEffect(() => {
    const saveTempValues = async () => {
      if (user && tempValues && !isCreating) {
        try {
          setIsCreating(true);
          const newValues = await valuesService.create(tempValues);
          setValuesResults(newValues);
          setTempValues(null); // Clear temp values after saving
          navigate("/");
        } catch (error) {
          console.error("Error saving temporary values:", error);
        } finally {
          setIsCreating(false); //reset flag after creation to make sure the create only occurs once
        }
      }
    };
    saveTempValues();
  }, [user, tempValues, navigate, isCreating]);

  // console.log(valuesResults);

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Dashboard
                valuesResults={valuesResults}
                setValuesResults={setValuesResults}
              />
            ) : (
              <Landing />
            )
          }
        />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route
              path="/values"
              element={<ValuesResults valuesResults={valuesResults} />}
            />
            <Route
              path="/values/new"
              element={<ValuesForm handleAddValues={handleAddValues} />}
            />
            <Route
              path="/users"
              element={<FriendsList users={users} setUsers={setUsers} valuesResults={valuesResults} />}
            />
            <Route
              path="/users/:friendId"
              element={<FriendProfile users={users} />}
            />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route
              path="/values/new"
              element={<ValuesForm handleAddValues={handleAddValues} />}
            />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
        <Route path="*" element={<h1>Oops, nothing here!</h1>} />
      </Routes>
    </>
  );
};

export default App;
