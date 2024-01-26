import React from "react";
import axios from "axios";
import { API_URL } from "../../constants/url";
import { Charity, useGiveBuddyStore } from '../../store/store';

import NavBar from "../NavBar/NavBar";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import "./RecommendedCharities.css"
import { getSpecificCharities } from "../../utils/utils";

const RecommendedCharities = () => {
  const [matched_charities, user_uid, updateMatchedCharities] = useGiveBuddyStore(
    (state) => [state.matched_charities, state.user_uid, state.updateMatchedCharities]
  )

  const [curCharity, setCurCharity] = React.useState<Charity|undefined>(undefined)
  const [curMatchedCharities, setCurMatchedCharities] = React.useState(matched_charities?.slice(0, 5))

  React.useEffect(() => {
    if (matched_charities){
      axios
        .get(`${API_URL}/charities/${matched_charities[1]}/`)
        .then((res) => setCurCharity(res.data))
        .catch((err) => console.log(err));
    }
  }, [matched_charities])

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

  return (
    <div id="rc-page">
      <NavBar/>
      <div id="rc-text-container">
        <h1 id="rc-header">Recommended Charities</h1>
        <p id="rc-description">Here are some charities that we’ve picked out for you.</p>
        <p id="rc-description">You can visit the charity website and donate today or you can save it to donate for another time.</p>
      </div>
      {/* {curMatchedCharities?.map((c) => {
        return (
          <h1>{c.toString()}</h1>
        )
      })} */}
      {curCharity !== undefined && (
        // <div>{curCharity.charity_name}</div>
        <div id="rc-page-card-container">
          <Card variant="outlined" sx={{ maxWidth: 770, maxHeight: 470 }}>
            <Box sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <img src={curCharity.logo}/>
                <Stack direction="column" justifyContent="space-between" alignItems="start">
                  <Typography gutterBottom variant="h6" component="div">
                    {curCharity.charity_name}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {curCharity.sub_category.split(", ").map((sc) => {
                      return (
                        <Chip label={sc} size="small" />
                      )
                    })}
                  </Stack>
                  <Typography gutterBottom variant="h6" component="div">
                    $4.50
                  </Typography>
                </Stack>
                <Typography gutterBottom variant="h6" component="div">
                  $4.50
                </Typography>
              </Stack>
            </Box>
            <Divider light variant="middle" style={{background: "#D9D9D9", width: "706.001px", height: "2px"}}/>
            <Box sx={{ p: 2 }}>
              <Typography gutterBottom variant="body2">
                Select type
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip color="primary" label="Soft" size="small" />
                <Chip label="Medium" size="small" />
                <Chip label="Hard" size="small" />
              </Stack>
            </Box>
          </Card>
        </div>
      )}
    </div>
  )
}

export default RecommendedCharities