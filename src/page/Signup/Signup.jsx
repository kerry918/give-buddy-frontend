import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../firebase';
import "./Signup.css"
import { useCreateUser } from '../../utils/utils';
import axios from "axios";
import { API_URL } from "../../constants/url";
import { useGiveBuddyStore } from '../../store/store';
import Logo from "../../assets/GiveBuddylogo.png"
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import availableProvince from '../../constants/province';

const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userProvince, setUserProvince] = useState('');
    const [updateUserUid, updateUserId] = useGiveBuddyStore(
      (state) => [state.updateUserUid, state.updateUserId]
  )
  const [error, setError] = useState('')
 
  const onSubmit = async (e) => {
    e.preventDefault()
  
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        updateUserUid(user.uid);
        axios
          .post(`${API_URL}/registration`, {
            "user_uid": user.uid,
            "first_name": firstName,
            "last_name": lastName, 
            "email": email, 
            "user_province": userProvince, 
            "user_city": userCity
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            console.log(res)
            updateUserId(res.data.user_id)
            navigate("/welcome")
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        if (errorCode.split("/")[1] === "email-already-in-use"){
          setError("Email address is already taken")
        }
        console.log(errorCode);
          // ..
      });
  }

  const onProvinceInputChange = (event) => {
    setUserProvince(event.target.value)
  }
 
  return (
    <>
      <div id="signup-header">
        <a href="/"><p id="title">GiveBuddy</p></a>
      </div>

      <div id="signup-page">    
        <div id="signup-container">
          <img src={Logo}/>
          <p id="signup-main-text">Create an Account</p>       
          <p id="signup-description">Discover your favourite charities with us!</p>                                                                    
          <form id="signup-form">   
              <div id="signup-form-name-field">
                <div id="signup-form-item">
                  <label htmlFor="first-name">
                      First Name
                  </label>
                  <input
                      id="signup-form-input"
                      name="first-name"
                      type="text"                                    
                      required                    
                      onChange={(e)=>setFirstName(e.target.value)}
                      style={{marginRight: '20px'}}
                  />
                </div>
                
                <div id="signup-form-item">
                  <label htmlFor="last-name">
                      Last Name
                  </label>
                  <input
                      id="signup-form-input"
                      name="last-name"
                      type="text"                                    
                      required                 
                      onChange={(e)=>setLastName(e.target.value)}
                  />
                </div>
              </div>   

              <div id="signup-form-item">
                <label htmlFor="city">
                    City
                </label>
                <input
                    id="signup-form-input"
                    name="city"
                    type="text"                                    
                    required                    
                    onChange={(e)=>setUserCity(e.target.value)}
                />
              </div>  

              <div style={{marginTop: "20px"}}>
                <label htmlFor="province">
                    Province
                </label>
                <FormControl style={{paddingTop: "5px"}}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="signup-province-select"
                    value={userProvince}
                    onChange={onProvinceInputChange}
                  >
                    {availableProvince.map((p) => {
                      return (
                        <MenuItem value={p.short} style={{height: "40px"}}>{p.long}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>   
              </div>   

              <div id="signup-form-item" style={{marginTop: "20px"}}>
                  <label htmlFor="email-address">
                      Email address
                  </label>
                  <input
                      id="signup-form-input"
                      type="email"
                      label="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}  
                      required  
                      style={{borderColor: error !== "" ? "#D72C0D" : "#AEB4B9"}}                                                         
                  />
                  {error !== "" && (
                    <div style={{display:"flex", flexDirection: "row", alignItems: "center", marginBottom: "20px"}}>
                      <ErrorRoundedIcon sx={{ color: "#D72C0D" }} />
                      <h1 id="signup-form-error">{error}</h1>
                    </div>
                  )} 
              </div>

              <div id="signup-form-item" style={{marginTop: error !== "" ? "5px" : "20px"}}>
                  <label htmlFor="password">
                      Password
                  </label>
                  <input
                      id="signup-form-input"
                      type="password"
                      label="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      required                      
                  />
              </div>                                     
              
              <button
                  type="submit" 
                  onClick={onSubmit} 
                  id="signup-form-button"                       
              >  
                  Create an Account                              
              </button>                                   
          </form>
          
          <p>
              Already have an account?{' '}
              <NavLink to="/login" style={{textDecoration:"underline", color: 'black'}}>
                  Log in
              </NavLink>
          </p>        
        </div>           
      </div>
    </>
  )
}
 
export default Signup