import React from "react"
import axios from "axios";
import { API_URL } from "../../constants/url";

import "./FindCharities.css"
import NavBar from "../NavBar/NavBar"
import { Charity, useGiveBuddyStore } from '../../store/store';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Button, CardActionArea, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const FindCharities = () => {
  const [charityList, setCharityList] = React.useState<Charity[] | null>(null)

  const [user_id] = useGiveBuddyStore(
    (state) => [state.user_id]
  )

  React.useEffect(() => {
    axios
      .get(`${API_URL}/charities/`)
      .then((res) => setCharityList(res.data.charity_list))
      .catch((err) => console.log(err));
  }, [])

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
    <div id="fc-page">
      <NavBar/>
      <div id="fc-text-container">
        <h1 id="fc-header">Charity Directory</h1>
        <p id="fc-description">List of all the charities available in GiveBuddy</p>
        {charityList ? charityList?.map((c) => {
          return (
            <Card sx={{ width: 850 }} id="fc-page-card-container">
              <CardActionArea>
                <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <img src={c.logo} id="fc-page-logo"/>
                        <Stack direction="column" spacing={1} alignItems="start" style={{width: 500}}>
                          <Link
                            to={{
                              pathname: `/charity/${c.charity_id}`
                            }}
                            id="fc-page-charity-detail-link"
                            state={{prev: "charity directory"}}
                          >
                            <Typography gutterBottom variant="h5" component="div">
                              {c.charity_name}
                            </Typography>
                          </Link>
                          <Stack direction="row" spacing={1} style={{flexWrap: "wrap"}}>
                            {c.sub_category.split(", ").map((sc) => {
                              return (
                                <Chip label={sc} size="small" style={{textTransform: "capitalize", margin: 5}} variant="outlined"/>
                              )
                            })}
                          </Stack>
                        </Stack>
                      </Stack>

                      <Button id="fc-page-save-button" variant="outlined" onClick={() => handleSaveCharity(c.charity_id)}>Save</Button>
                    </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        }) : 
        <div style={{paddingTop: 300}}>
          <CircularProgress/>
        </div>}
      </div>
    </div>
  )
}

export default FindCharities