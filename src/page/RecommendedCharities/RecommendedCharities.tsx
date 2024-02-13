import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/url";
import { Charity, useGiveBuddyStore } from '../../store/store';

import NavBar from "../NavBar/NavBar";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import "./RecommendedCharities.css"
import { financialTransparency, resultsReporting } from "../../constants/score";
import { Button } from "@mui/material";

const RecommendedCharities = () => {
  const [matched_charities, user_uid, updateMatchedCharities, user_id] = useGiveBuddyStore(
    (state) => [state.matched_charities, state.user_uid, state.updateMatchedCharities, state.user_id]
  )

  const [curCharity, setCurCharity] = React.useState<Charity|undefined>(undefined)
  const [curMatchedCharities, setCurMatchedCharities] = React.useState(matched_charities?.slice(0, 5))
  const [curCharityIdx, setCurCharityIdx] = React.useState(0)

  React.useEffect(() => {
    if (curMatchedCharities){
      axios
        .get(`${API_URL}/charities/${curMatchedCharities[curCharityIdx]}/`)
        .then((res) => setCurCharity(res.data))
        .catch((err) => console.log(err));
    }
  }, [curCharityIdx])

  // Call user info endpoint if matched charities is empty
  React.useEffect(() => {
    if (matched_charities === undefined){
      axios
        .get(`${API_URL}/user_profile/${user_uid}`)
        .then((res) => {
            updateMatchedCharities(res.data.user_data.matched_charities)
        })
        .catch((err) => console.log(err));
    } 
  }, [])

  const onBackClick = () => {
    if (curCharityIdx > 0){
      setCurCharityIdx(curCharityIdx-1)
    }
  }

  const onForwardClick = () => {
    if (curCharityIdx < 4){
      setCurCharityIdx(curCharityIdx+1)
    }
  }

  const handleSaveCharity = (charity_id: Number) => {
    axios
    .post(`${API_URL}/saved_charities/${user_id}`, {
      "saved_charity":charity_id,
    })
    .then((res) => {
        console.log(res)
    })
    .catch((err) => console.log(err));
  } 

  return (
    <div id="rc-page">
      <NavBar/>
      <div id="rc-text-container">
        <h1 id="rc-header">Recommended Charities</h1>
        <p id="rc-description">Here are some charities that we’ve picked out for you.</p>
        <p id="rc-description">You can visit the charity website and donate today or you can save it to donate for another time.</p>
      </div>
      {curCharity !== undefined && (
        // <div>{curCharity.charity_name}</div>
        <div id="rc-page-card-container">
          {curCharityIdx > 0 && (
            <div id="rc-page-back-icon" onClick={onBackClick}>
              <ArrowBackIosIcon fontSize="medium"/>
            </div>
          )}
          <Card variant="outlined" sx={{ maxWidth: 770, maxHeight: 470 }} id="rc-page-card">
            <Box sx={{ p: 2 }}>
              <div id="rc-page-top-content-container">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <img src={curCharity.logo} style={{width: 155}}/>
                  <Stack direction="column" justifyContent="space-between" alignItems="start" id="rc-page-center-container">
                    <Typography gutterBottom variant="h6" component="div">
                      {curCharity.charity_name}
                    </Typography>
                    <Stack direction="row" spacing={1} style={{flexWrap: "wrap"}}>
                      {curCharity.sub_category.split(", ").map((sc) => {
                        return (
                          <Chip label={sc} size="small" style={{textTransform: "capitalize", margin: 5}} variant="outlined"/>
                        )
                      })}
                    </Stack>
                    <Stack direction="row" spacing={1} id="rc-page-score-container">
                      <Stack direction="column" spacing={1} alignItems="center" id="rc-page-score-subcontainer">
                        <Typography gutterBottom component="div" id="rc-page-score-title">
                          FINANCIAL TRANSPARENCY
                        </Typography>
                        <Typography id="rc-page-score-value">
                          {financialTransparency[curCharity.financial_transparency.toString()]}
                        </Typography>
                      </Stack>
                      <Stack direction="column" spacing={1} alignItems="center" id="rc-page-score-subcontainer">
                        <Typography gutterBottom component="div" id="rc-page-score-title">
                          CENTS TO CAUSE
                        </Typography>
                        <Typography gutterBottom component="div" id="rc-page-score-value">
                          {curCharity.cents_to_cause.toString()} %
                        </Typography>
                      </Stack>
                      <Stack direction="column" spacing={1} alignItems="center" id="rc-page-score-subcontainer">
                        <Typography gutterBottom component="div" id="rc-page-score-title">
                          RESULTS REPORTING
                        </Typography>
                        <Typography gutterBottom component="div" id="rc-page-score-value">
                          {resultsReporting[curCharity.results_reporting.toString()]}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                <div id="rc-page-save-button-container">
                  <Button id="rc-page-save-button" variant="outlined" onClick={() => handleSaveCharity(curCharity.charity_id)}>Save</Button>
                </div>
              </div>
            </Box>
            <Divider light style={{background: "#D9D9D9", height: "2px"}}/>
            <Box sx={{ p: 2 }}>
              <Typography gutterBottom variant="body2" id="rc-page-about-title">
                About
              </Typography>
              <Typography gutterBottom variant="body2" id="rc-page-about-description">
                {curCharity.overview}
              </Typography>
              <Link
                to={{
                  pathname: `/charity/${curCharity.charity_id}`
                }}
                id="rc-page-learn-more-link"
                state={{prev: "recommendation"}}
              >
                Learn More
              </Link>
            </Box>
            <div id="rc-page-visit-button-container">
              <Button size="large" href={"https://" + curCharity.website} target="_blank" id="rc-page-visit-button">Visit Charity Website</Button>
            </div>
          </Card>
          {curCharityIdx < 4 && (
            <div id="rc-page-forward-icon" onClick={onForwardClick}>
              <ArrowForwardIosIcon/>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default RecommendedCharities