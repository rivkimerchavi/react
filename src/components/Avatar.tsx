import { useContext } from "react";
import { UserContext } from "./AppLayout";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Box } from "@mui/material";

const Avatar1 = () => {
  const context = useContext(UserContext);
  let first: string = '';
  if (context) {
    first = context.user.firstName[0];
  }

  return (
    <>
      <Box display="flex" justifyContent="flex-start" p={2} sx={{ position: 'fixed', top: 10, left: 0 }}>
        <Avatar
          sx={{
            bgcolor: '#d32f2f',
            '&:hover': {
              bgcolor: '#b71c1c', // צבע אדום כהה יותר בריחוף
            },
            fontWeight: 'bold', // לעבות את האות הראשונה
          }}
        >
          {first}
        </Avatar>
      </Box>
    </>
  );
}

export default Avatar1;
