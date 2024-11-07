import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { pages, Shop, blogPages } from "../../commom";

const CustomAppbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState("");

  const handleMenuOpen = (event, type) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuType("");
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          bgcolor: "white",
          boxShadow: "1px",
          borderBottom: "1px solid #ddd",
          paddingLeft: { xs: "3%", sm: "5%", md: "8%" }, // Responsive padding
          paddingRight: { xs: "3%", sm: "5%", md: "8%" }, // Responsive padding
        }}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", padding: "0 !important" }}
        >
          {/* Left Section: Bold Text */}
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "black" }}>
            Flatlogic
          </Typography>

          {/* Center Section: Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" sx={{ color: "black" }}>
              Home
            </Button>

            {/* Pages Menu */}
            <Button
              color="inherit"
              sx={{ color: "black" }}
              onClick={(e) => handleMenuOpen(e, "pages")}
            >
              Pages <ExpandMoreIcon />
            </Button>
            <Button
              color="inherit"
              sx={{ color: "black" }}
              onClick={(e) => handleMenuOpen(e, "shop")}
            >
              Shop <ExpandMoreIcon />
            </Button>
            <Button
              color="inherit"
              sx={{ color: "black" }}
              onClick={(e) => handleMenuOpen(e, "blog")}
            >
              Blog <ExpandMoreIcon />
            </Button>

            {/* Menu Component */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {(menuType === "pages"
                ? pages
                : menuType === "shop"
                ? Shop
                : blogPages
              ).map((item) => (
                <MenuItem key={item.value} onClick={handleMenuClose}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Right Section: Icons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton color="inherit" sx={{ color: "black" }}>
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit" sx={{ color: "black" }}>
              <Person2OutlinedIcon />
            </IconButton>
            <IconButton color="inherit" sx={{ color: "black" }}>
              <ShoppingCartOutlinedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CustomAppbar;
