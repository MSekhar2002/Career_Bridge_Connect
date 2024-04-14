import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ClientSideErrorScreen from "./screens/ClientSideErrorScreen";
import Login from "./auth/Login";
import Register from "./auth/Register";
import axios from "axios";
import AuthContext from "./context/AuthContext";
import Navbar from "./layout/Navbar";
import HomePage from "./components/HomePage";
import Footer from "./layout/Footer";
import StudentHomePage from "./components/UserHomePage";
import StudentList from "./components/StudentList";
import MissionPage from "./components/OurMission";
import AreasOfInterestPage from "./components/AreaOfIntrest";
import CompaniesPage from "./components/CompanyList";
import SkillRequirementsPage from "./components/SkillRequiremnet";
import OurTeamPage from "./components/Team";
import ContactUsPage from "./components/ContactUs";

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
        <Route path="/mission" Component={MissionPage} />
        <Route path="/team" Component={OurTeamPage} />
        <Route path="/contactus" Component={ContactUsPage} />
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
            <Route path="/studentlist" Component={StudentList} />
            <Route path="/intrest" Component={AreasOfInterestPage} />
            <Route path="/companylist" Component={CompaniesPage} />
            <Route path="/requirement" Component={SkillRequirementsPage} />
            
            
            <Route path="*" element={<ClientSideErrorScreen />} />


          </>
        )}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
