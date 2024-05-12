import axios from "axios";
import React, { createContext } from "react";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import instance from "../axios/axios";

const UserContext = createContext();

const UserContextProvider = (props) => {
  const { loggedIn } = useContext(AuthContext);
  const [userData, setUserData] = React.useState([]);
  //username
  const userToken = localStorage.getItem("token");

  const getUserData = async () => {
    try {
      const newData = JSON.parse(localStorage.getItem("AuthenticatedUser"));
      const response = await instance.get(`/getuser`);
  
      const { db } = response.data || {};
      const UpdatedData = db.find(obj => obj._id === newData._id);
  
      setUserData(UpdatedData);
    } catch (error) {
      console.log( error.message);
      // Handle error here, e.g., setUserData to null or display an error message
    }
  };
  
  React.useEffect(() => {
    if (loggedIn === true && userToken) {
      getUserData();
    }
  }, [loggedIn, userToken]);


  return (
    <UserContext.Provider value={{ userData, getUserData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { UserContextProvider };
