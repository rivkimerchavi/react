import { createContext, useContext, useReducer, useState, Dispatch } from "react";
import { Action, User, UserReducer } from "./User";
import LogIn from "./LogIn";
import UpDate from "./UpDate";
import Avatar from "./Avatar";
import Avatar1 from "./Avatar";
import LogUp from "./LogUp";
import AddRecipe from "./AddRecipe";
import AllRecipes from "./AllRecipes";
import { Outlet } from "react-router-dom";

import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const Home = () => {

  const [login, setLogin] = useState(false);
  const handOnLogIn = () => {
    setLogin(true);
  };

  return (
    <>
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        p={2} 
        sx={{
          position: 'fixed', 
          top: '10%', // גובה נמוך יותר
          left: '50%', 
          transform: 'translateX(-50%)', 
          color: '#d32f2f', // צבע אדום
          fontSize: '70px', // גודל קטן יותר
          fontWeight: '600', // משקל פחות כבד
          letterSpacing: '1px',
          background: 'transparent', // רקע שקוף
          padding: '10px 20px',
          // ללא צללים או מסגרות
        }}
      >
        My Recipe Site
      </Box>
      
      {/* אם לא מחובר, הצג את LogUp ו- LogIn */}
      {!login && <LogUp OnLogIn={handOnLogIn} />}
      {!login && <LogIn OnLogIn={handOnLogIn} />}
    
      {/* אם מחובר, הצג את Avatar ו- UpDate */}
      {login && <Avatar />}
      {login && <UpDate />}
      
    </>
  );
}

export default Home;
