import React,{useContext} from 'react';
import Button from '@mui/material/Button';
import AuthContext from "../context/AuthContext";

function HomePage() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen flex justify-center items-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-6">Welcome to Carrier Bridge Connect</h1>
        <p className="text-lg mb-8">Where students meet their dream careers and companies find future talent.</p>
        {!loggedIn && <Button variant="contained" color="primary" href="/register">Register Now</Button>}
      </div>
    </div>
  );
}

export default HomePage;
