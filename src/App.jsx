import { useContext, useState } from "react";
import { Routes, Route, useNavigate } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import FriendProfile from "./components/FriendProfile/FriendProfile";
import FriendsList from "./components/FriendsList/FriendsList";
import ValuesForm from "./components/ValuesForm/ValuesForm";
import ValuesResults from "./components/ValuesResults/ValuesResults";

import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useContext(UserContext);
  const [ valuesResults, setValuesResults] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e, averages) => {
    e.preventDefault();
    console.log(averages);
    setValuesResults(averages);
    { user ? 
      navigate("/") : navigate("/sign-up")
    };
  }


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard valuesResults={valuesResults}/> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path="/values" element={<ValuesResults />} />
            <Route path="/values/new" element={<ValuesForm onSubmit={handleSubmit}/>} />
            <Route path="/users" element={<FriendsList />} />
            <Route path="/users/:userId" element={<FriendProfile />} />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path="/values/new" element={<ValuesForm onSubmit={handleSubmit}/>} />
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
