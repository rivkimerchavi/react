import { useContext, useRef, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { UserContext } from "./AppLayout";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const UpDate = () => {
  const lastnameRef = useRef<HTMLInputElement>(null);
  const adressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [click, setclick] = useState(false);
  const context = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:3000/api/user/', {
        firstName: context?.user.firstName || ' ',
        password: context?.user.password || ' ',
        lastName: lastnameRef.current?.value || '',
        email: emailRef.current?.value || ' ',
        adress: adressRef.current?.value || ' ',
        phone: phoneRef.current?.value || ' ',
      }, {
        headers: { 'user-id': context?.user.id },
      });

      console.log('Updated User:', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <>
      <Outlet />
      <Box
        display="flex"
        justifyContent="center"
        p={2}
        sx={{
          position: 'fixed',
          top: 20,
          left: '120px',
          transform: 'translateX(-50%)',
          color: 'white',
          backgroundColor: '#d32f2f',
          padding: '10px 20px',
          borderRadius: '50px',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#b71c1c',
          },
        }}
        onClick={() => setclick(true)}
      >
        <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
          Update
        </Typography>
      </Box>

      {click &&
        <Modal
          open={click}
          onClose={() => { setclick(false); }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>
              עדכון פרטי המשתמש
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                fullWidth
                label="שם משפחה"
                variant="outlined"
                inputRef={lastnameRef}
                sx={{
                  marginBottom: '15px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    borderColor: '#d32f2f',
                  },
                }}
              />
              <TextField
                type="text"
                fullWidth
                label="כתובת"
                variant="outlined"
                inputRef={adressRef}
                sx={{
                  marginBottom: '15px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    borderColor: '#d32f2f',
                  },
                }}
              />
              <TextField
                type="text"
                fullWidth
                label="טלפון"
                variant="outlined"
                inputRef={phoneRef}
                sx={{
                  marginBottom: '15px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    borderColor: '#d32f2f',
                  },
                }}
              />
              <TextField
                type="text"
                fullWidth
                label="אימייל"
                variant="outlined"
                inputRef={emailRef}
                sx={{
                  marginBottom: '20px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    borderColor: '#d32f2f',
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#d32f2f',
                  color: 'white',
                  padding: '12px 0',
                  width: '100%',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#b71c1c',
                  },
                }}
              >
                שלח
              </Button>
            </form>
          </Box>
        </Modal>
      }
    </>
  );
}

export default UpDate;
