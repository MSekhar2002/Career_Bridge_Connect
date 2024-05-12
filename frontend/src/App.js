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
import ProfilePage from "./components/ProfilePage";
import Vivek from "./components/Vivek";

axios.defaults.withCredentials = true;
const App = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vivek" element={<Vivek />} />
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/team" element={<OurTeamPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />

        {loggedIn === false && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<ClientSideErrorScreen />} />
          </>
        )}

        {loggedIn === true && (
          <>
            <Route path="/userhome" element={<StudentHomePage />} />
            <Route path="/studentlist" element={<StudentList />} />
            <Route path="/intrest" element={<AreasOfInterestPage />} />
            <Route path="/companylist" element={<CompaniesPage />} />
            <Route path="/requirement" element={<SkillRequirementsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<ClientSideErrorScreen />} />
          </>
        )}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
