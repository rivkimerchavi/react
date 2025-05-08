import { Box, Button, Modal, TextField, Typography, InputAdornment, IconButton } from "@mui/material"
import { createContext, useContext, useRef, useState } from "react"
import axios from "axios"
import { UserContext } from "./AppLayout"
import { Visibility, VisibilityOff } from "@mui/icons-material"

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

const LogUp = ({ OnLogIn }: { OnLogIn: Function }) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [click, setclick] = useState(false)
  const [passwordVisibility, setPasswordVisibility] = useState(false) // לשלוט על אם הסיסמא נראית או לא
  const context = useContext(UserContext)
  const [user, setuser] = useState({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/user/register', {
        firstName: nameRef.current?.value,
        password: passwordRef.current?.value
      })
      alert('ההרשמה הצליחה!')
      console.log(res);
      setuser(res.data.user)

      OnLogIn();

      if (context) {
        setclick(false)
        context.userDispatch({
          type: 'CREATE', data: {
            id: res.data.userId,
            firstName: nameRef.current?.value || ' ',
            lastName: '',
            password: passwordRef.current?.value || '',
            email: ' ',
            adress: ' ',
            phone: ' '
          }
        })
      }
    } catch (e) {
      alert('שגיאה בהרשמה')
      console.log(e)
    }
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        p={2}
        sx={{
          position: 'fixed', top: 20, left:120, // מיקום בצד העליון של המסך
          color: 'white', backgroundColor: '#d32f2f', padding: '10px 20px', borderRadius: '50px',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#b71c1c',
          }
        }}
        onClick={() => setclick(true)}
      >
        <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
          LogUp
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
              הרשמה למערכת
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
                type={passwordVisibility ? "text" : "password"} // אם הסיסמא צריכה להיות גלויה או לא
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setPasswordVisibility(!passwordVisibility)} // הפעלת/כיבוי של הצגת הסיסמא
                      >
                        {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
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
                הרשמה
              </Button>
            </form>
          </Box>
        </Modal>
      }
    </>
  )
}

export default LogUp
