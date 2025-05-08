import axios from "axios"
import { createContext, useContext, useRef, useState } from "react"
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { UserContext } from "./AppLayout"

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

const LogIn = ({ OnLogIn }: { OnLogIn: Function }) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [click, setclick] = useState(false)
  const context = useContext(UserContext)
  const [user, setuser] = useState({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/user/login', {
        firstName: nameRef.current?.value,
        password: passwordRef.current?.value
      })

      console.log(res);
      setuser(res.data.user)

      OnLogIn();

      if (context) {
        setclick(false)
        context.userDispatch({
          type: 'CREATE', data: {
            id: res.data.user.id,
            firstName: nameRef.current?.value || ' ',
            lastName: '',
            password: passwordRef.current?.value || '',
            email: ' ',
            adress: ' ',
            phone: ' '
          }
        })
      }
    }
    catch (e) {
      if (e.status === 401)
        alert('מייל או סיסמא לא תקינים')
      console.log(e);
    }
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        p={2}
        sx={{
          position: 'fixed', top: 20, left: '20px', // מיקום הכפתור בצד הימני למעלה
          color: 'white', backgroundColor: '#d32f2f', padding: '10px 20px', borderRadius: '50px',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#b71c1c',
          }
        }}
        onClick={() => setclick(true)}
      >
        <Typography variant="h6" component="span" sx={{  fontWeight: 'bold' }}>
        LogIn
        </Typography>
      </Box>

      {click &&
        <Modal
          open={click}
          onClose={() => { setclick(false) }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>
              התחבר לחשבון
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                fullWidth
                label="שם משתמש"
                variant="outlined"
                inputRef={nameRef}
                sx={{
                  marginBottom: '15px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    borderColor: '#d32f2f', // מסגרת אדומה לשדה שם המשתמש
                  },
                }}
              />
              <TextField
                type="password"
                fullWidth
                label="סיסמא"
                variant="outlined"
                inputRef={passwordRef}
                sx={{
                  marginBottom: '20px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    borderColor: '#d32f2f', // מסגרת אדומה לשדה הסיסמא
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#d32f2f', // רקע אדום לכפתור
                  color: 'white', // צבע לבן לטקסט
                  padding: '12px 0',
                  width: '100%',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#b71c1c', // צבע רקע אדום כהה יותר
                  }
                }}
              >
                שלח
              </Button>
            </form>
          </Box>
        </Modal>
      }
    </>
  )
}

export default LogIn
