import { useContext } from "react";
import { userContext } from "./Home";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple, red } from '@mui/material/colors';
import { Box } from "@mui/material";
// import { deepOrange } from "@mui/material/colors";
const Avatar1 = () => {
const context=useContext(userContext)
  let first:string=''
  if(context)
{first=context.user.firstName[0]}
    return ( <>
   
   <Box display="flex" justifyContent="flex-first" p={2} sx={{ position: 'fixed', top: 0, left: 0 }}>
       <Avatar sx={{ bgcolor:'red' }}>{first}</Avatar> 
      </Box>


        </>
       
    )
}

export default Avatar1;
