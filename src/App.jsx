import React, { createContext, useContext, useEffect, useReducer } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./Navbar";
import Login from "./Login";
import Profile from "./Profile";
import Signup from "./Signup";
import About from "./About";
import Post from "./Post";
import Userprofile from "./Userprofile";
import Myfollowers from "./myfollowers";
import { reducer, initialState } from "./Reducers/useReducers";

export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      navigate("/Profile");
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return (
    <Routes>
      <Route exact path="/" element={<About />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/Profile" element={<Profile />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/createpost" element={<Post />} />
      <Route exact path="/Profile/:id" element={<Userprofile />} />
      <Route exact path="/myfollowers" element={<Myfollowers />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
