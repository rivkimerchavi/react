import { Box } from "@mui/material";
import { Link } from "react-router"
const NavBar = () => 
{
  return(<>
    <nav>

  <Box display="flex" justifyContent="flex-first" p={2} sx={{ position: 'fixed', top: 0, right: 0}}>
  <Link to='/'>Home</Link> | |
  <Link to='/Avatar'>Avatar</Link>| |
  <Link to='/UpDate'>UpDate</Link> 
    </Box>
    </nav>
    </>)
}
export default NavBar;