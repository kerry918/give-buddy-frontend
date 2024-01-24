import React from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Logo from "../../assets/GiveBuddylogo.png"
import Profile from "../../assets/Avatarprofile.png"
import "./NavBar.css"

const NavBar = () => {
  // const navItems = ['Recommendations', 'Find Charities', 'My Charities'];

  const navItems = [
    {
      name: "Recommendations",
      href: "/recommended_charities"
    }, 
    {
      name: "Find Charities",
      href: "/find_charities"
    },
    {
      name: "My Charities",
      href: "/my_charities"
    }
  ]


  return (
    <AppBar component="nav" position="fixed">
      <Toolbar style={{backgroundColor: "white"}}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          style={{display: "flex", alignContent: "center", paddingLeft: "8%"}}
        >
          <a href="/">
            <img src={Logo}/>
          </a>
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navItems.map((item) => (
            <Button key={item.name} sx={{ color: '#254139', textTransform: "capitalize" }} href={item.href}>
              {item.name}
            </Button>
          ))}
        </Box>
        <div id="nav-profile">
          <img src={Profile}/>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar