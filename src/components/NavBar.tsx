import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./AppLayout";
import HomeIcon from '@mui/icons-material/Home';
import RecipeIcon from '@mui/icons-material/LocalDining';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';

const NavBar = () => {
  const context = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav>
      <Box display="flex" justifyContent="flex-end" p={2} sx={{ position: 'fixed', top: 0, right: 0, zIndex: 10 }}>
        {/* אייקון לתפריט */}
        <IconButton onClick={handleMenuOpen} sx={{ color: 'black' }}>
          <HomeIcon />
        </IconButton>

        {/* תפריט נפתח */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="AllRecipes" onClick={handleMenuClose}>
            <RecipeIcon sx={{ marginRight: 1 }} />
            רשימת מתכונים
          </MenuItem>
          <MenuItem component={Link} to="/" onClick={handleMenuClose}>
            <HomeIcon sx={{ marginRight: 1 }} />
            HOME
          </MenuItem>

          {/* הצגת לינק "הוספת מתכון" אם המשתמש מחובר */}
          {context?.user.id != null && (
            <MenuItem component={Link} to="AddRecipe" onClick={handleMenuClose}>
              <AddIcon sx={{ marginRight: 1 }} />
              הוספת מתכון
            </MenuItem>
          )}

          {/* הצגת לינק "עדכון מתכון" אם המשתמש מחובר */}
          {context?.user.id != null && (
            <MenuItem component={Link} to="UpdateRecipe" onClick={handleMenuClose}>
              <UpdateIcon sx={{ marginRight: 1 }} />
              עדכון מתכון
            </MenuItem>
          )}
        </Menu>
      </Box>
    </nav>
  );
};

export default NavBar;
