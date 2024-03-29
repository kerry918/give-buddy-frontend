import React from "react"
import { useParams, useLocation } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { API_URL } from "../../constants/url";
import { Charity, useGiveBuddyStore } from '../../store/store';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Button } from "@mui/material";
import { financialTransparency, resultsReporting } from "../../constants/score";

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


import "./CharityDetail.css"

const CharityDetail = (props: any) => {
  let { id } = useParams();
  const location = useLocation()
  const { prev } = location.state
  const [curCharity, setCurCharity] = React.useState<Charity|undefined>(undefined)
  const [user_id] = useGiveBuddyStore(
    (state) => [state.user_id]
  )
  const [donated, setDonated] = React.useState(false)

  React.useEffect(() => {
    axios
      .get(`${API_URL}/charities/${id}/`)
      .then((res) => setCurCharity(res.data))
      .catch((err) => console.log(err));
  }, [])

  const handleSaveCharity = (charity_id: Number | undefined) => {
    if (charity_id){
      axios
      .post(`${API_URL}/saved_charities/${user_id}`, {
        "saved_charity":charity_id,
      })
      .then((res) => {
          console.log(res)
      })
      .catch((err) => console.log(err));
    }
  }

  const handleDonateCharity = (charity_id: Number | undefined) => {
    if (charity_id){
      axios
      .post(`${API_URL}/update_donated_charities/${user_id}`, {
        "donated_charity_id":charity_id
      })
      .then((res) => {
          console.log(res)
          setDonated(true)
      })
      .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    setTimeout(() => {
      setDonated(false);
    }, 5000);
  }, [donated]);  

  return (
    <div id="cd-page">
      <NavBar/>
      <Collapse in={donated} style={{position: "absolute", top: "80px", left: "20px"}}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setDonated(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Your donation has been recorded in My Charities
        </Alert>
      </Collapse>
      <div id="cd-page-container">
        <div id="cd-page-breadcrumb">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              href={prev === "recommendation" ? "/recommended_charities" : prev === "charity directory" ? "/find_charities" : "/my_charities"}
              style={{ textTransform: "capitalize", color: "#717171"}}
            >
              {prev}
            </Link>
            <Typography style={{color: "#254139"}}>{curCharity?.charity_name}</Typography>
          </Breadcrumbs>
        </div>
        <div id="cd-page-card-container">
          <Card variant="outlined" sx={{ maxWidth: 770 }} id="cd-page-card">
            <Box sx={{ p: 2 }}>
              <div id="cd-page-top-content-container">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <img src={curCharity?.logo} style={{width: 155}}/>
                  <Stack direction="column" justifyContent="space-between" alignItems="start" id="cd-page-center-container">
                    <Typography gutterBottom variant="h6" component="div">
                      {curCharity?.charity_name}
                    </Typography>
                    <Stack direction="row" spacing={1} style={{flexWrap: "wrap"}}>
                      {curCharity?.sub_category.split(", ").map((sc) => {
                        return (
                          <Chip label={sc} size="small" style={{textTransform: "capitalize", margin: 5}} variant="outlined"/>
                        )
                      })}
                    </Stack>
                    <Stack direction="row" spacing={1} id="cd-page-score-container">
                      <Stack direction="column" spacing={1} alignItems="center" id="cd-page-score-subcontainer">
                        <Typography gutterBottom component="div" id="cd-page-score-title">
                          FINANCIAL TRANSPARENCY
                        </Typography>
                        {curCharity && (
                          <Typography id="cd-page-score-value">
                            {financialTransparency[curCharity?.financial_transparency.toString()]}
                          </Typography>
                        )}    
                      </Stack>
                      <Stack direction="column" spacing={1} alignItems="center" id="cd-page-score-subcontainer">
                        <Typography gutterBottom component="div" id="cd-page-score-title">
                          CENTS TO CAUSE
                        </Typography>
                        <Typography gutterBottom component="div" id="cd-page-score-value">
                          {curCharity?.cents_to_cause.toString()} %
                        </Typography>
                      </Stack>
                      <Stack direction="column" spacing={1} alignItems="center" id="cd-page-score-subcontainer">
                        <Typography gutterBottom component="div" id="cd-page-score-title">
                          RESULTS REPORTING
                        </Typography>
                        {curCharity && (
                          <Typography gutterBottom component="div" id="cd-page-score-value">
                            {resultsReporting[curCharity?.results_reporting.toString()]}
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                <div id="cd-page-save-button-container">
                  <Button id="cd-page-save-button" variant="outlined" onClick={() => handleSaveCharity(curCharity?.charity_id)}>Save</Button>
                </div>
              </div>
            </Box>
            <div id="cd-page-visit-button-container">
              <Button size="large" href={"https://" + curCharity?.website} target="_blank" id="cd-page-visit-button">Visit Charity Website</Button>
            </div>
            <div id="cd-page-donate-container">
              <div>
                <h1 id="cd-page-donate-header">Did you donate to {curCharity?.charity_name}?</h1>
                <h1 id="cd-page-donate-desc">Let us know and we’ll help you keep track of your donations.</h1>
              </div>
              <div>
                <button id="cd-page-donate-button" onClick={() => handleDonateCharity(curCharity?.charity_id)}>Yes</button>
                <button id="cd-page-donate-button">No</button>
              </div>
            </div>
            <Box sx={{ pt: 2 }}>
              <Typography gutterBottom variant="body2" id="cd-page-about-title">
                About
              </Typography>
              <Typography gutterBottom variant="body2" id="cd-page-about-description">
                {curCharity?.overview}
              </Typography>
              <Typography gutterBottom variant="body2" id="cd-page-about-title">
                Results and Impact
              </Typography>
              <Typography gutterBottom variant="body2" id="cd-page-about-description">
                {curCharity?.results_and_impact}
              </Typography>
            </Box>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CharityDetail