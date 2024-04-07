import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ClientSideErrorScreen from "./screens/ClientSideErrorScreen";
import Login from "./auth/Login";
import Register from "./auth/Register";
import axios from "axios";
import AuthContext from "./context/AuthContext";
import SplashScreen from "./screens/SplashScreen";
import AddForms from "./screens/AddForms";
import FormTable from "./screens/FormTable";
import Navbar from "./layout/Navbar";
import HomePage from "./components/HomePage";
import Footer from "./layout/Footer";
import StudentHomePage from "./components/UserHomePage";

axios.defaults.withCredentials = true;
const App = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<HomePage/>}
        />
        {loggedIn === false && (
          <>
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="*" element={<ClientSideErrorScreen />} />
          </>
        )}
        {loggedIn === true && (
          <>
            <Route path="/userhome" Component={StudentHomePage} />
            
            <Route path="*" element={<ClientSideErrorScreen />} />

          </>
        )}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
