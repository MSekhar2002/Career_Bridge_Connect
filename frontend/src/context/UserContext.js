import axios from "axios";
import React, { createContext } from "react";
import { useContext } from "react";
import AuthContext from "./AuthContext";

const UserContext = createContext();

const UserContextProvider = (props) => {
  const { loggedIn } = useContext(AuthContext);
  const [userData, setUserData] = React.useState([]);
  //username
  const userToken = localStorage.getItem("token");

  const getUserData = () => {
    const newData = JSON.parse(localStorage.getItem("AuthenticatedUser"));
    setUserData(newData);
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
