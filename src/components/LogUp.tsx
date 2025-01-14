import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { createContext, useContext, useRef, useState } from "react"
import { userContext, userId } from "./Home"
import axios from "axios"
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
 
const LogUp = ({OnLogIn}: { OnLogIn: Function}) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
const [click,setclick]=useState(false)
const context=useContext(userContext)
const [user,setuser]=useState({})


const contextValue = useContext(userId);
if (!contextValue) {
    return <div>Loading...</div>; // או טיפול שגיאות אחר
}
const { setid } = contextValue;
const handleSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();
   
    try{
        const res = await axios.post('http://localhost:3001/api/user/register', {
          firstName: nameRef.current?.value,
          password: passwordRef.current?.value
        })
  
        console.log(res);
        setuser(res.data.user)
         setid(res.data.userId)
        OnLogIn();

        if (context) {

            setclick(false)
          context.userDispatch({ type: 'CREATE', data: {    firstName: nameRef.current?.value||' ',
            lastName:'',
            password:passwordRef.current?.value||'',
            email: ' ',
            adress: ' ',
            phone: ' '}}) }
      
          }
          catch (e) {
    alert(e)
      
          }
    
  
    
    }
    return (<>

        <Box display="flex" justifyContent="flex-first" p={2} sx={{ position: 'fixed', top: 0, left: 150 }}>
                  <button   onClick={() => setclick(true)}>LogUp</button>
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
                      <TextField type="text" fullWidth label="First Name" variant="outlined" inputRef={nameRef} />
                      <TextField type="text" fullWidth label="Password" variant="outlined" inputRef={passwordRef} />
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
export default LogUp