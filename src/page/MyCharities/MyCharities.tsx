import React from "react"

import "./MyCharities.css"
import NavBar from "../NavBar/NavBar"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const MyCharities = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div id="mc-page">
      <NavBar/>
      <div id="mc-text-container">
        <h1 id="mc-header">My Charities</h1>
        <p id="mc-description">List of charities that you have saved and donated</p>
        <div id="mc-tab-section">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Saved Charities" value="1" style={{textTransform: "capitalize", color: "#202223", width: "400px"}}/>
                <Tab label="Donated Charities" value="2" style={{textTransform: "capitalize", color: "#202223", width: "400px"}}/>
              </TabList>
            </Box>
            <TabPanel value="1">Saved Charities</TabPanel>
            <TabPanel value="2">Donated Charities</TabPanel>
          </TabContext>
        </div>
      </div>
    </div>
  )
}

export default MyCharities