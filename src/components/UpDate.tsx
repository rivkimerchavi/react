import { useContext, useRef, useState } from "react"
import { userContext, userId } from "./Home"
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import axios from "axios";
import { userContex } from "./LogIn";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const UpDate = () => {

      const lastnameRef = useRef<HTMLInputElement>(null)
        const adressRef = useRef<HTMLInputElement>(null)
          const phoneRef = useRef<HTMLInputElement>(null)
            const emailRef = useRef<HTMLInputElement>(null)
            const [click,setclick]=useState(false)
            const context=useContext(userContext)
         
  
            const contextValue = useContext(userId);
            if (!contextValue) {
                return <div>Loading...</div>; // טיפול בריקנות הקונטקסט
            }
        
            const { id } = contextValue

            const handleSubmit = async () => {
              try {
                
                  const response = await axios.put('http://localhost:3001/api/user/', {
                    firstName:context?.user.firstName||' ',
                    password:context?.user.password||' ',
                    lastName:lastnameRef.current?.value||'',
                    email: emailRef .current?.value||' ',
                    adress: adressRef .current?.value||' ',
                    phone: phoneRef.current?.value||' '} 
                  ,{
                    headers: { 'user-id': id}
                }
              )

                  console.log('Updated User:', response.data);
              } catch (error) {
                  console.error('Error updating user:', error);
              }
          };
      
    return (<>
    <Box display="flex" justifyContent="flex-first" p={2} sx={{ position: 'fixed', top: 0, left: 60}}>
     <button  onClick={() => setclick(true)}>UPDATE</button>
    </Box>
   
     {click &&
      <Modal
        open={click}
        onClose={() => { setclick(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form onSubmit={handleSubmit}>
              <TextField type="text" fullWidth label="lastname" variant="outlined" inputRef={lastnameRef} />
              <TextField type="text" fullWidth label="adress" variant="outlined" inputRef={adressRef} />
              <TextField type="text" fullWidth label="phone" variant="outlined" inputRef={phoneRef} />
              <TextField type="text" fullWidth label="email" variant="outlined" inputRef={emailRef} />
              <Button type='submit' variant="contained" sx={{
                backgroundColor: 'white',
                color: ' #40E0D0 ',
                marginTop: '15px',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
              >Send</Button>
            </form>
          </Typography>

        </Box>
      </Modal>
    }

  </>)
            }
  

export default UpDate