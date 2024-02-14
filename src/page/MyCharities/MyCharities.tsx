import React from "react"
import axios from "axios";
import { API_URL } from "../../constants/url";

import "./MyCharities.css"
import NavBar from "../NavBar/NavBar"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Charity, useGiveBuddyStore } from '../../store/store';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Button, CardActionArea, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const MyCharities = () => {
  const [value, setValue] = React.useState('1');
  const [user_id] = useGiveBuddyStore(
    (state) => [state.user_id]
  )

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [savedCharities, setSavedCharities] = React.useState<number[]>([])
  const [donatedCharities, setDonatedCharities] = React.useState<number[][]>([])
  const [donatedCharitiesId, setDonatedCharitiesId] = React.useState<number[]>([])
  const [savedCharityList, setSavedCharityList] = React.useState<Charity[] | null>(null)
  const [donatedCharityList, setDonatedCharityList] = React.useState<Charity[] | null>(null)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    axios
    .get(`${API_URL}/my_charities/${user_id}`)
    .then((res) => {
      setSavedCharities(res.data)
    })
    .catch((err) => console.log(err))
  }, [])

  React.useEffect(() => {
    axios
    .get(`${API_URL}/my_donated_charities/${user_id}`)
    .then((res) => {
      setDonatedCharities(res.data)
      donatedCharities.map((c: number[]) => {
        const newList = [...donatedCharitiesId, c[0]]
        setDonatedCharitiesId(newList)
      })
    })
    .catch((err) => console.log(err));
  }, [])

  React.useEffect(() => {
    axios
    .get(`${API_URL}/my_charities/${user_id}`)
    .then((res) => {
      setSavedCharities(res.data)
    })
    .catch((err) => console.log(err))

    axios
    .get(`${API_URL}/my_donated_charities/${user_id}`)
    .then((res) => {
      setDonatedCharities(res.data)
      const newList: React.SetStateAction<number[]> = []
      donatedCharities.map((c: number[]) => {
        newList.push(c[0])
        setDonatedCharitiesId(newList)
      })
    })
    .catch((err) => console.log(err));
  }, [value])

  React.useEffect(() => {
    console.log(donatedCharitiesId)
    axios
    .get(`${API_URL}/charities/`)
    .then((res) => {
      setSavedCharityList(res.data.charity_list.filter((c: Charity) => savedCharities.includes(c.charity_id as number)))
      setDonatedCharityList(res.data.charity_list.filter((c: Charity) => donatedCharitiesId.includes(c.charity_id as number)))
    })
    .catch((err) => console.log(err));
  }, [savedCharities, donatedCharitiesId])

  return (
    <div id="mc-page">
      <NavBar/>
      <div id="mc-text-container">
        <h1 id="mc-header">My Charities</h1>
        <p id="mc-description">List of charities that you have saved and donated</p>
        <div id="mc-tab-section">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderBottomColor: '#E1E3E5'}}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" style={{justifyContent: "center"}} TabIndicatorProps={{style: {background: "#269271"}}}>
                <Tab label="Saved Charities" value="1" style={{textTransform: "capitalize", color: value === "1" ? "#202223" : "#6D7175", width: "450px"}}/>
                <Tab label="Donated Charities" value="2" style={{textTransform: "capitalize", color: value === "2" ? "#202223" : "#6D7175", width: "450px"}}/>
              </TabList>
            </Box>
            <TabPanel value="1">
              {savedCharityList ? savedCharityList?.map((c) => {
                return (
                  <Card sx={{ width: 720 }} id="fc-page-card-container">
                    <Link
                      to={{
                        pathname: `/charity/${c.charity_id}`
                      }}
                      id="fc-page-charity-detail-link"
                      state={{prev: "my charities"}}
                    >
                      <CardActionArea>
                        <CardContent>
                            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                              <Stack direction="row" spacing={1} alignItems="center">
                                <img src={c.logo} id="fc-page-logo"/>
                                <Stack direction="column" spacing={1} alignItems="start" style={{width: 500}}>
                                  <Typography gutterBottom variant="h5" component="div">
                                    {c.charity_name}
                                  </Typography>
                                  <Stack direction="row" spacing={1} style={{flexWrap: "wrap"}}>
                                    {c.sub_category.split(", ").map((sc) => {
                                      return (
                                        <Chip label={sc} size="small" style={{textTransform: "capitalize", margin: 5}} variant="outlined"/>
                                      )
                                    })}
                                  </Stack>
                                </Stack>
                              </Stack>
                            </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Link>
      
                  </Card>
                )
              }) : 
              <div style={{paddingTop: 300}}>
                <CircularProgress/>
              </div>}
            </TabPanel>
            <TabPanel value="2">
              {donatedCharityList ? donatedCharityList.map((c) => {
                return (
                  <div id="mc-donated-container">
                    <div style={{display: "flex", flexDirection: "row"}}>
                      <div id="mc-donated-logo">
                        <img src={c.logo} width="60"/>
                      </div>
                      <h1 id="mc-donated-charity-name">{c.charity_name}</h1>
                    </div>
                    
                    <div id="mc-donated-amount-edit-container">
                      {(donatedCharities.filter((d) => d[0] === c.charity_id as number)) !== undefined
                      && ((donatedCharities.filter((d) => d[0] === c.charity_id as number))[0].length === 2)
                      && (
                        <h1 id="mc-donated-amount">$ {Object.values(donatedCharities.filter((d) => d[0] === c.charity_id as number))[0][1]} donated</h1>
                      )}
                      <div onClick={handleClickOpen}>
                        <CreateIcon/>
                      </div>
                    </div>

                    <Dialog
                      onClose={handleClose}
                      open={open}
                      BackdropProps ={{ style: { backgroundColor: 'rgba(51, 51, 51, 0.50)' } }}
                    >
                      <DialogTitle id="customized-dialog-title">
                        Modal title
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogContent dividers>
                        <Typography gutterBottom>
                          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                          consectetur ac, vestibulum at eros.
                        </Typography>
                        <Typography gutterBottom>
                          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                        </Typography>
                        <Typography gutterBottom>
                          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                          ullamcorper nulla non metus auctor fringilla.
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                          Save changes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                )
              }) : 
              <div style={{paddingTop: 300}}>
                <CircularProgress/>
              </div>
              }
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </div>
  )
}

export default MyCharities